import { RealisticExample } from "./realistic";

function Header() {
  return (
    <templ>
      {`// "GENERATED CODE -- DO NOT EDIT!"`}
    </templ>
  )
}

function Imports({ imports }: { imports: RealisticExample.Import[] }) {
  return (
    <templ>
      {`import * as grpcWeb from "grpc-web"`}
      {`import * jspb from "google-protobuf"`}
      <ln />

      {imports.map(imprt => (
        <templ>
          {`import * ${imprt.name} from "${imprt.path}";`}
        </templ>
      )).join('')}
    </templ>
  );
}

function Client({ client }: { client: RealisticExample.Client }) {
  return (
    <templ>
      {`export interface ${client.interfaceClassName} {`}
      <indent>
        {client.methods.map(method => (
          method.isServerStreaming ? (
            <templ>
              {`${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => grpcWeb.ClientReadableStream<${method.outputType}>;`}
            </templ>
          ) : (
            <templ>
              {`${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => Promise<${method.outputType}>;`}
            </templ>
          )
        )).join('')}
      </indent>
      {`}`}

      <ln/>

      {`export class ${client.clientClassName} extends ${client.interfaceClassName} {`}
      <indent>
        {client.methods.map(method => (
          <templ>
            {`public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): Promise<${method.outputType}> {`}
            <indent>
              {`return void;`}
            </indent>
            {`}`}
          </templ>
        )).join('')}
      </indent>
      {`}`}
    </templ>
  );
}

function Clients({ clients }: { clients: RealisticExample.Client[] }) {
  return (
    <templ>
      {clients.map(client => (
        <templ>
          <Client client={client} />
          <ln />
        </templ>
      ))}
    </templ>
  );
}

export default function (ctx: RealisticExample.Context) {
  return (
    <templ>
      <Header />
      <ln/>
      <Imports imports={ctx.imports} />
      <ln/>
      <Clients clients={ctx.clients} />
    </templ>
  );
}
