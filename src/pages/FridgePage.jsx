import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { presetFridgeItems } from "../data/fridgeItems.js";

const CUSTOM_FRIDGE_KEY = "prepPalCustomFridgeItems";
const ITEM_EXPIRATIONS_KEY = "prepPalFridgeExpirations";
const PRESET_FRIDGE_KEY = "prepPalPresetFridgeItems";
const MS_IN_DAY = 1000 * 60 * 60 * 24;

const readJson = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const readCustomItems = () => readJson(CUSTOM_FRIDGE_KEY, []);
const readItemExpirations = () => readJson(ITEM_EXPIRATIONS_KEY, {});
const readPresetItems = () => {
  const stored = readJson(PRESET_FRIDGE_KEY, null);
  const fallback = presetFridgeItems.slice(0, 2); // keep at least two example items

  if (!Array.isArray(stored) || stored.length === 0) {
    return fallback;
  }

  // Keep any local changes (like removed items) but normalize links and images.
  return stored
    .map((item) => {
      const canonical = presetFridgeItems.find(
        (preset) => preset.id === item.id
      );

      return canonical
        ? { ...canonical, ...item, detailHref: canonical.detailHref }
        : item;
    })
    .filter(Boolean);
};

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getDaysUntilExpiration = (expiresOn) => {
  if (!expiresOn) {
    return null;
  }

  const expirationDate = new Date(expiresOn);
  if (Number.isNaN(expirationDate)) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expirationDate.setHours(0, 0, 0, 0);

  return Math.round((expirationDate - today) / MS_IN_DAY);
};

const getExpirationCopy = (name, expiresOn) => {
  const daysLeft = getDaysUntilExpiration(expiresOn);
  if (daysLeft === null) {
    return null;
  }

  if (daysLeft < 0) {
    const daysAgo = Math.abs(daysLeft);
    return {
      text: `${name} expired ${daysAgo} day${daysAgo === 1 ? "" : "s"} ago.`,
      severity: "expired",
      daysLeft,
    };
  }

  if (daysLeft === 0) {
    return {
      text: `${name} expires today.`,
      severity: "urgent",
      daysLeft,
    };
  }

  if (daysLeft === 1) {
    return {
      text: `${name} expires tomorrow.`,
      severity: "soon",
      daysLeft,
    };
  }

  return {
    text: `${name} expires in ${daysLeft} days.`,
    severity: daysLeft <= 3 ? "soon" : "scheduled",
    daysLeft,
  };
};

export default function FridgePage() {
  const [presetState, setPresetState] = useState(() => readPresetItems());
  const [customItems, setCustomItems] = useState(() => readCustomItems());
  const [itemExpirations, setItemExpirations] = useState(() =>
    readItemExpirations()
  );
  const [newItemName, setNewItemName] = useState("");
  const [newItemFile, setNewItemFile] = useState(null);
  const [newItemExpiration, setNewItemExpiration] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      PRESET_FRIDGE_KEY,
      JSON.stringify(presetState)
    );
  }, [presetState]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      CUSTOM_FRIDGE_KEY,
      JSON.stringify(customItems)
    );
  }, [customItems]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      ITEM_EXPIRATIONS_KEY,
      JSON.stringify(itemExpirations)
    );
  }, [itemExpirations]);

  const handleUpload = (event) => {
    event.preventDefault();
    const trimmedName = newItemName.trim();

    if (!trimmedName || !newItemFile) {
      setUploadStatus({
        type: "error",
        message: "Add a name, photo, and (optionally) an expiration date.",
      });
      return;
    }

    if (!newItemFile.type.startsWith("image/")) {
      setUploadStatus({
        type: "error",
        message: "Only image files can be uploaded.",
      });
      return;
    }

    const reader = new FileReader();
    const formElement = event.target;

    reader.onload = () => {
      const newItem = {
        id: makeId(),
        name: trimmedName,
        image: reader.result,
        addedAt: new Date().toISOString(),
        expiresOn: newItemExpiration || null,
        source: "custom",
      };

      setCustomItems((prev) => [...prev, newItem]);
      setNewItemName("");
      setNewItemFile(null);
      setNewItemExpiration("");
      formElement.reset();
      setUploadStatus({
        type: "success",
        message: `${trimmedName} added to your fridge.`,
      });
    };

    reader.onerror = () => {
      setUploadStatus({
        type: "error",
        message: "Something went wrong while reading that photo.",
      });
    };

    reader.readAsDataURL(newItemFile);
  };

  const handleRemoveItem = (id, source) => {
    if (source === "preset") {
      setPresetState((prev) => prev.filter((item) => item.id !== id));
      setItemExpirations((prev) => {
        const clone = { ...prev };
        delete clone[id];
        return clone;
      });
      return;
    }

    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleExpirationChange = (item, nextExpiration) => {
    if (item.source === "custom" || item.addedAt) {
      setCustomItems((prev) =>
        prev.map((existing) =>
          existing.id === item.id
            ? { ...existing, expiresOn: nextExpiration || null }
            : existing
        )
      );
      return;
    }

    setItemExpirations((prev) => {
      if (!nextExpiration) {
        const clone = { ...prev };
        delete clone[item.id];
        return clone;
      }

      return { ...prev, [item.id]: nextExpiration };
    });
  };

  const presetWithExpirations = useMemo(
    () =>
      presetState.map((item) => ({
        ...item,
        expiresOn: itemExpirations[item.id] ?? null,
        source: "preset",
      })),
    [presetState, itemExpirations]
  );

  const displayedItems = [...presetWithExpirations, ...customItems];

  const expiringSoon = displayedItems
    .map((item) => {
      const info = getExpirationCopy(item.name, item.expiresOn);
      if (!info || info.daysLeft > 3) {
        return null;
      }

      return { ...info, id: item.id, name: item.name };
    })
    .filter(Boolean)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <main>
      <div>
        <section className="notif-column">
          <h1>Alerts</h1>
          {expiringSoon.length ? (
            expiringSoon.map((alert) => (
              <div
                key={alert.id}
                className={`alert ${alert.severity}`}
                role={alert.severity === "expired" || alert.severity === "urgent" ? "alert" : "status"}
              >
                <p>
                  <strong>{alert.name}</strong> — {alert.text}
                </p>
              </div>
            ))
          ) : (
            <div className="alert" role="status">
              <p>
                <strong>All clear!</strong> No items are expiring in the next
                few days.
              </p>
            </div>
          )}
        </section>

        <section className="fridge-column">
          <h1>Fridge</h1>
          <form className="fridge-upload-form" onSubmit={handleUpload}>
            <h2>Add what's actually inside</h2>
            <label htmlFor="new-item-name">Item name</label>
            <input
              id="new-item-name"
              type="text"
              placeholder="Item name"
              value={newItemName}
              onChange={(event) => setNewItemName(event.target.value)}
            />
            <label htmlFor="new-item-photo">Upload a photo</label>
            <input
              id="new-item-photo"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setNewItemFile(event.target.files[0] ?? null)
              }
            />
            <label htmlFor="new-item-expiration">Expiration date (optional)</label>
            <input
              id="new-item-expiration"
              type="date"
              value={newItemExpiration}
              onChange={(event) => setNewItemExpiration(event.target.value)}
            />
            <button className="btn signup" type="submit">
              Upload photo
            </button>
            {uploadStatus?.message && (
              <p
                className={`upload-status ${uploadStatus.type}`}
                role="status"
                aria-live="polite"
              >
                {uploadStatus.message}
              </p>
            )}
          </form>
          <div className="fridge">
            {displayedItems.map((item) => (
              <FridgeItemCard
                key={item.id}
                item={item}
                onRemove={() => handleRemoveItem(item.id, item.source)}
                onExpirationChange={(next) =>
                  handleExpirationChange(item, next)
                }
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function FridgeItemCard({ item, onRemove, onExpirationChange }) {
  const imageElement = item.detailHref ? (
    <Link to={item.detailHref}>
      <img className="fridge-item" src={item.image} alt={item.name} />
    </Link>
  ) : (
    <img className="fridge-item" src={item.image} alt={item.name} />
  );

  const expiration = getExpirationCopy(item.name, item.expiresOn);

  return (
    <div className="fridge-item">
      <figure>
        {imageElement}
        <figcaption>
          <cite>
            {item.creditHref ? (
              <a href={item.creditHref}>{item.name}</a>
            ) : (
              item.name
            )}
          </cite>
        </figcaption>
      </figure>
      <div className="expiration-control">
        <label htmlFor={`expiration-${item.id}`}>Expiration date</label>
        <div className="expiration-input-row">
          <input
            id={`expiration-${item.id}`}
            type="date"
            value={item.expiresOn ?? ""}
            onChange={(event) =>
              onExpirationChange(event.target.value || null)
            }
          />
          {item.expiresOn && (
            <button
              type="button"
              className="clear-expiration-btn"
              onClick={() => onExpirationChange(null)}
            >
              Clear
            </button>
          )}
        </div>
        {expiration && (
          <p className={`expiration-status ${expiration.severity}`}>
            {expiration.text}
          </p>
        )}
      </div>
      <button
        className="remove-item-btn"
        type="button"
        onClick={() => {
          if (
            window.confirm(
              `Remove ${item.name} from your fridge? You can always add it again later.`
            )
          ) {
            onRemove();
          }
        }}
      >
        Remove
      </button>
    </div>
  );
}
