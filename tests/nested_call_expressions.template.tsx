export default function generate() {
  return (
    <templ>
      {["test1"]
        .map((item1) => {
          let test = "";
          return ["test2"]
            .map((item2) => {
              test = item2;

              return (
                <templ>
                  {`${item1}`}
                  {`${test}`}
                  {"test3"}
                </templ>
              );
            })
            .join("");
        })
        .join("")}
    </templ>
  );
}

console.log(generate());
