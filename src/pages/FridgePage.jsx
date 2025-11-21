export default function FridgePage() {
  return (
    <main>
      <div>
        <section className="notif-column">
          <h1>Alerts</h1>
          <div className="alert">
            <p><strong>! Apples</strong> are about to expire (In 2 days) </p>
          </div>

          <div className="alert">
            <p><strong>!</strong> Missing information for several items </p>
          </div>
        </section>

        <section className="fridge-column">
          <h1>Fridge</h1>
          <div className="fridge">
            <div className="fridge-item">
              <figure>
                <a href="/fridge-items/fridge-apples.html">
                  <img className="fridge-item" src="/img/apple.png" alt="Apples" />
                </a>
                <figcaption>
                  <cite>
                    <a href="https://pngimg.com/image/12405">Apples</a>
                  </cite>
                </figcaption>
              </figure>
            </div>
            <div className="fridge-item">
              <figure>
                <a href="/fridge-items/fridge-oranges.html">
                  <img className="fridge-item" src="/img/oranges.png" alt="Oranges" />
                </a>
                <figcaption>
                  <cite>
                    <a href="https://gallery.yopriceville.com/Free-Clipart-Pictures/Fruit-PNG/Large_Oranges_PNG_Clipart">Oranges</a>
                  </cite>
                </figcaption>
              </figure>
            </div>

            <div className="fridge-item">
              <figure>
                <a href="/fridge-items/fridge-bananas.html">
                  <img className="fridge-item" src="/img/bananas.png" alt="Bananas" />
                </a>
                <figcaption>
                  <cite>
                    <a href="https://pngtree.com/freepng/banana-yellow-fruit-banana-skewers_8413319.html">Bananas</a>
                  </cite>
                </figcaption>
              </figure>
            </div>

            <div className="fridge-item">
              <figure>
                <a href="/fridge-items/fridge-peaches.html">
                  <img className="fridge-item" src="/img/peaches.png" alt="Peaches" />
                </a>
                <figcaption>
                  <cite>
                    <a href="https://gallery.yopriceville.com/Free-Clipart-Pictures/Fruit-PNG/Large_Peaches_PNG_Clipart">Peaches</a>
                  </cite>
                </figcaption>
              </figure>
            </div>

            <div className="fridge-item">
              <figure>
                <a href="/fridge-items/fridge-blueberries.html">
                  <img className="fridge-item" src="/img/blueberries.png" alt="Blueberries" />
                </a>
                <figcaption>
                  <cite>
                    <a href="https://pngimg.com/image/26708">Blueberries</a>
                  </cite>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
