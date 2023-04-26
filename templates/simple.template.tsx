export default function (ctx: { hello: string }) {
  return <templ>{`Hello, ${ctx.hello}`}</templ>;
}
