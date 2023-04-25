function returnsArray() {
  return ["d", "e", "f"];
}

export default () => (
  <templ>
    {["a", "b", "c"]}
    {returnsArray()}
    {["1", "2", "3"].map((v) => v)}
  </templ>
);
