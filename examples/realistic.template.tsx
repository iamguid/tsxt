import { RealisticExample } from "./realistic"

function Header() {
    <templ>
        {`// "GENERATED CODE -- DO NOT EDIT!"`}
        <ln/>
    </templ>
}

function Imports({ imports }: { imports: any[] }) {
    <templ>
        {`import * as grpcWeb from "grpc-web"`}
        {`import * jspb from "google-protobuf"`}
        <ln/>

        {imports.map((imprt: any) => {
            {`import * ${imprt.name} from "${imprt.path}"`}
        })}
        <ln/>
    </templ>
}

function Client({ client }: { client: any }) {
    <templ>
        {`export interface ${client.interfaceClassName}`}
        <cb>
        {client.methods.map((method: any) => {
            if (method.isServerStreaming) {
                {`${method.methodName}}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => grpcWeb.ClientReadableStream<${method.outputType}>`}
            } else {
                {`${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => Promise<${method.outputType}>`}
            }
        })}
        </cb>

        {`export class ${client.clientClassName} extends ${client.interfaceClassName}`}
        <cb>
        {client.methods.map((method: any) => {
            {`public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): Promise<${method.outputType}>`}
            <cb>
                {`return void;`}
            </cb>
        })}
        </cb>
    </templ>
}


function Clients({ clients }: { clients: any }) {
    <templ>
        {clients.map((client: any) => (
            <templ>
                <Client client={client}/>
                <ln/>
            </templ>
        ))}
    </templ>
}

export default function (ctx: any) {
    <templ>
        <Header/>
        <Imports imports={ctx.imports}/>
        <Clients clients={ctx.clients}/>
    </templ>
}