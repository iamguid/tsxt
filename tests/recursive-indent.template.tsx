import "../dist-lib/src/index";

function RecursiveTempl({
  ctx,
  currentDepth,
  depth,
}: {
  ctx: string;
  currentDepth: number;
  depth: number;
}) {
  if (currentDepth < depth) {
    return (
      <templ>
        {`{`}
        <indent>
          <RecursiveTempl
            ctx={ctx}
            currentDepth={++currentDepth}
            depth={depth}
          />
        </indent>
        {`}`}
      </templ>
    );
  }

  return <templ>{`Hello ${ctx}`}</templ>;
}

export default (ctx: string) => (
  <templ>
    <RecursiveTempl ctx={ctx} currentDepth={0} depth={3} />
  </templ>
);
