"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function Header() {
  <templ>
        {`// "GENERATED CODE -- DO NOT EDIT!"`}
        <ln />
    </templ>;
}

function Imports({
  imports
}) {
  <templ>
        {`import * as grpcWeb from "grpc-web"`}
        {`import * jspb from "google-protobuf"`}
        <ln />

        {imports.map(imprt => {
      {
        `import * ${imprt.name} from "${imprt.path}"`;
      }
    })}
        <ln />
    </templ>;
}

function Client({
  client
}) {
  <templ>
        {`export interface ${client.interfaceClassName}`}
        <cb>
        {client.methods.map(method => {
        if (method.isServerStreaming) {
          {
            `${method.methodName}}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => grpcWeb.ClientReadableStream<${method.outputType}>`;
          }
        } else {
          {
            `${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => Promise<${method.outputType}>`;
          }
        }
      })}
        </cb>

        {`export class ${client.clientClassName} extends ${client.interfaceClassName}`}
        <cb>
        {client.methods.map(method => {
        {
          `public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): Promise<${method.outputType}>`;
        }
        <cb>
                {`return void;`}
            </cb>;
      })}
        </cb>
    </templ>;
}

function Clients({
  clients
}) {
  <templ>
        {clients.map(client => <templ>
                <Client client={client} />
                <ln />
            </templ>)}
    </templ>;
}

function _default(ctx) {
  <templ>
        <Header />
        <Imports imports={ctx.imports} />
        <Clients clients={ctx.clients} />
    </templ>;
}