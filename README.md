```tsx
import { DtoFilesGenerator } from "../src/generator/DtoFilesGenerator/DtoFilesGenerator";

export function generate(ctx: DtoFilesGenerator.Context) {
  <template>
    {`// GENERATED CODE -- DO NOT EDIT!`}
    <ln/>

    {`import * as grpcWeb from "grpc-web"`}
    {`import * jspb from "google-protobuf`}
    <ln/>

    {ctx.imports.map((imprt) => {
      {`import * ${imprt.name} from "${imprt.path}"`}
    })}
  </template>;
};
```

```tsx
import { ClientsFilesGenerator } from "../src/generator/ClientFilesGenerator/ClientsFilesGenerator";
import { Import } from "../src/generator/ClientFilesGenerator/clientsFileDepsResolver";

export default function(ctx: ClientsFilesGenerator.Context) {
  <template>
    {`// "GENERATED CODE -- DO NOT EDIT!"`}
    <ln/>

    {`import * as grpcWeb from "grpc-web"`}
    {`import * jspb from "google-protobuf"`}
    <ln/>

    {ctx.imports.map((import) => {
      {`import * ${import.name} from "${import.path}"`}
    })}

    {ctx.clients.map((client) => {
      {makeClient(client)}
      <ln/>
    })}
  </template>;
};

const makeClient = (client: ClientsFilesGenerator.Client) => {
  <template>
    {`export interface ${client.interfaceClassName} {`}
    <indent>
      {client.methods.map((method) => {
        if (method.isServerStreaming) {
          {`${method.methodName}}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => grpcWeb.ClientReadableStream<${method.outputType}>`}
        } else {
          {`${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => Promise<${method.outputType}>`}
        }
      })}
    </indent>
    {`}`}

    {`export class ${client.clientClassName} extends ${client.interfaceClassName} {`}
    <indent>
      {client.methods.map((method) => {
        {`public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): Promise<${method.outputType}> {`}
        <indent>
          {`return void;`}
        </indent>
        {`}`}
      })}
    </indent>
    {`}`}
  </template>
}
```
