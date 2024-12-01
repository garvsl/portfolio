export const Container = ({ text, items }) => {
  return (
    <div>
      <h2>{text}</h2>
      <ul className="flex flex-col gap-2"></ul>
    </div>
  );
};

function App() {
  return (
    <div className="p-2 flex flex-col gap-4">
      <Container text={"Garvsl"} items={[{ icon: "" }]} />
      <Container text={"Live Projects"} />
    </div>
  );
}

export default App;
