import { Link, useParams } from "react-router-dom";
import { getFridgeItemDetail } from "../data/fridgeItems.js";

export default function FridgeItemDetail() {
  const { slug } = useParams();
  const detail = getFridgeItemDetail(slug);

  if (!detail) {
    return (
      <main className="fridge-item-detail-page">
        <article className="fridge-item-detail">
          <div className="detail-content">
            <p className="detail-eyebrow">Fridge guide</p>
            <h1>We couldn't find that item</h1>
            <p className="detail-summary">
              Try heading back to your fridge and opening one of the preset fruits again.
            </p>
            <div className="detail-actions">
              <Link className="chip" to="/fridge">
                Back to fridge
              </Link>
            </div>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="fridge-item-detail-page">
      <article className="fridge-item-detail">
        <div className="detail-image">
          <img src={detail.image} alt={detail.name} />
        </div>
        <div className="detail-content">
          <p className="detail-eyebrow">Fridge guide</p>
          <h1>{detail.name}</h1>
          <p className="detail-summary">{detail.summary}</p>
          <div className="detail-grid">
            <div>
              <h2>Storage</h2>
              <ul>
                {detail.storageTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Use it up</h2>
              <ul>
                {detail.usageIdeas.map((idea) => (
                  <li key={idea}>{idea}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="detail-actions">
            <Link className="chip" to="/fridge">
              Back to fridge
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
