import { Context, Import, Client } from "./realistic";

const HeaderTmpl = () => <templ>{`// "GENERATED CODE -- DO NOT EDIT!"`}</templ>;

const ImportsTmpl = ({ imports }: { imports: Import[] }) => (
  <templ>
    {`import * as grpcWeb from "grpc-web"`}
    {`import * jspb from "google-protobuf"`}
    <ln />

    {imports
      .map((imprt) => (
        <templ>{`import * ${imprt.name} from "${imprt.path}";`}</templ>
      ))
      .join("")}
  </templ>
);

const ClientTmpl = ({ client }: { client: Client }) => (
  <templ>
    {`export interface ${client.interfaceClassName} {`}
    <indent>
      {client.methods
        .map((method) =>
          method.isServerStreaming ? (
            <templ>
              {`${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => grpcWeb.ClientReadableStream<${method.outputType}>;`}
            </templ>
          ) : (
            <templ>
              {`${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => Promise<${method.outputType}>;`}
            </templ>
          )
        )
        .join("")}
    </indent>
    {`}`}

    <ln />

    {`export class ${client.clientClassName} extends ${client.interfaceClassName} {`}
    <indent>
      {client.methods
        .map((method) => (
          <templ>
            {`public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): Promise<${method.outputType}> {`}
            <indent>{`return void;`}</indent>
            {`}`}
          </templ>
        ))
        .join("")}
    </indent>
    {`}`}
  </templ>
);

const ClientsTmpl = ({ clients }: { clients: Client[] }) => (
  <templ>
    {clients.map((client) => (
      <templ>
        <ClientTmpl client={client} />
        <ln />
      </templ>
    ))}
  </templ>
);

export default (ctx: Context) => (
  <templ>
    <HeaderTmpl />
    <ln />
    <ImportsTmpl imports={ctx.imports} />
    <ln />
    <ClientsTmpl clients={ctx.clients} />
  </templ>
);
