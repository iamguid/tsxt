import { Context, Import, Client } from "./realistic";

const HeaderTmpl = () => <templ>{`// "GENERATED CODE -- DO NOT EDIT!"`}</templ>;

const ImportsTmpl = ({ imports }: { imports: Import[] }, children: any[]) => (
  <templ>
    {children}
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
    <ClientInterfaceTmpl client={client} />
    <ln />
    <ClientClassTmpl client={client} />
  </templ>
);

const ClientInterfaceTmpl = ({ client }: { client: Client }) => (
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
  </templ>
)

const ClientClassTmpl = ({ client }: { client: Client }) => (
  <templ>
    {`export class ${client.clientClassName} extends ${client.interfaceClassName} {`}
    <indent>
      {client.methods
        .map((method) =>
          method.isServerStreaming ? (
            <templ>
              {`public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): grpcWeb.ClientReadableStream<${method.outputType}> {`}
              <indent>{`return void;`}</indent>
              {`}`}
            </templ>
          ) : (
            <templ>
              {`public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): Promise<${method.outputType}> {`}
              <indent>{`return void;`}</indent>
              {`}`}
            </templ>
          )
        )
        .join("")}
    </indent>
    {`}`}
  </templ>
)

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
    <ImportsTmpl imports={ctx.imports}>
      <templ>
        {`import * as grpcWeb from "grpc-web"`}
        {`import * jspb from "google-protobuf"`}
      </templ>
    </ImportsTmpl>
    <ln />
    <ClientsTmpl clients={ctx.clients} />
  </templ>
);