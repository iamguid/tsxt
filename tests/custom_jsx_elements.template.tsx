function CustomWithoutArgs() {
  return "test 1";
}

function CustomWithArgs({
  arg1,
  arg2,
  arg3,
  arg4,
}: {
  arg1: string;
  arg2: string;
  arg3: string;
  arg4: string[];
}) {
  return (
    <templ>
      {arg1}
      {arg2}
      {arg3}
      {arg4[0]}
    </templ>
  );
}

export default function generate() {
  <templ>
    <CustomWithoutArgs />
    <CustomWithArgs arg1="test2" arg2="test3" arg3={`test4`} arg4={["test5"]} />
  </templ>;
}

console.log(generate());
