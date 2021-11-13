import "../src/index";

const CustomWithArgsTmpl = ({
  arg1,
  arg2,
  arg3,
}: {
  arg1: string;
  arg2: string;
  arg3: string[];
}) => {
  return (
    <templ>
      {arg1}
      {arg2}
      {arg3[0]}
    </templ>
  );
};

export default () => (
  <templ>
    <CustomWithArgsTmpl arg1="test1" arg2={`test2`} arg3={["test3"]} />
  </templ>
);
