export default () => (
  <templ>
    {true && "a"}
    {true && "b"}
    {false && "c"}
    <indent>{true && "d"}</indent>
  </templ>
);
