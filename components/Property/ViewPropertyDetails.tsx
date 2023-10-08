import Map from "./Map";

const text = (
  <>
    <h1 className="text-3xl my-4">Overview</h1>
    <p className="text-sm">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In inventore
      labore, laudantium laboriosam alias repellat saepe dolore quia consequatur
      ut assumenda explicabo beatae provident optio excepturi aliquid facere
      ullam omnis! Lorem ipsum dolor sit amet consectetur adipisicing elit. In
      inventore labore, laudantium laboriosam alias repellat saepe dolore quia
      consequatur ut assumenda explicabo beatae provident optio excepturi
      aliquid facere ullam omnis! Lorem ipsum dolor sit amet consectetur
      adipisicing elit.
    </p>
    <h1 className="text-3xl my-4">Amenities</h1>
    <ul className="text-sm">
      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
      <li>Possimus quas dicta soluta quidem necessitatibus</li>
      <li>dolores quam, itaque mollitia dignissimos distinctio vero</li>
      <li>Deserunt id at ad tenetur voluptas nulla quam labore.</li>
    </ul>
    <h1 className="text-3xl my-4">Area</h1>
  </>
);

export default function ViewPropertyDetails() {
  return (
    <div className="h-screen overflow-y-auto text-left ml-2 pb-">
      {text}
      <Map />
    </div>
  );
}
