const Sample = () => {
  const items = ['React', 'JSX', 'Vite'];

  return (
    <div>
      <h1>Sample Component</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sample;
