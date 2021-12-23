import "../dist-lib/src/index";

function recursive (ctx: string, currentDepth: number, depth: number) {
  if (currentDepth < depth) {
    return (
      <templ>
        {`{`}
        <indent>
          {recursive(ctx, ++currentDepth, depth)}
        </indent>
        {`}`}
      </templ>
    )
  }

  return <templ>{`Hello ${ctx}`}</templ> 
}

export default function (ctx: string) {
  return recursive(ctx, 0, 3);
}
