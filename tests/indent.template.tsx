export default function generate() {
  return (
    <templ>
      {"line 1"}
      <indent>{"line 2"}</indent>
      <indent>
        {"line 3"}
        <indent>
          {"line 4"}
          <ln />
          {"line 5"}
          {"line 6"}
        </indent>
        {"line 7"}
      </indent>
    </templ>
  );
}

console.log(generate());
