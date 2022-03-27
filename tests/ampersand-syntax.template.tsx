import "../dist-lib/src/index";

export default () => (
  <templ>
    {true && 'a'}
    {true && 'b'}
    {false && 'c'}
    {true && 'd'}
  </templ>
);