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

        {imports.map((imprt: any) => (
            <templ>
                {`import * ${imprt.name} from "${imprt.path}"`}
            </templ>
        ))}
        <ln/>
    </templ>
}

function Client({ client }: { client: any }) {
    <templ>
        {`export interface ${client.interfaceClassName}`}
        <cb>
            {client.methods.map((method: any) => {
                if (method.isServerStreaming) {
                    <templ>
                        {`${method.methodName}}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => grpcWeb.ClientReadableStream<${method.outputType}>`}
                    </templ>
                } else {
                    <templ>
                        {`${method.methodName}: (request: ${method.inputType}, metadata: grpcWeb.Metadata) => Promise<${method.outputType}>`}
                    </templ>
                }
            })}
        </cb>

        {`export class ${client.clientClassName} extends ${client.interfaceClassName}`}
        <cb>
        {client.methods.map((method: any) => {
            <templ>
                {`public ${method.methodName}(request: ${method.inputType}, metadata: grpcWeb.Metadata): Promise<${method.outputType}>`}
                <cb>
                    {`return void;`}
                </cb>
            </templ>
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