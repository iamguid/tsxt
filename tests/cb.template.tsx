export default function generate(ctx: any) {
    return (
        <templ>
            {`namespace A`}
            <cb>
                {`class A`}
                <cb>
                    {`function a()`}
                    <cb>
                        {`let ret = "Hello";`}
                        {`return ret;`}
                    </cb>

                    <ln/>

                    {`function b()`}
                    <cb>
                        {`let ret = "World";`}
                        {`return ret;`}
                    </cb>
                </cb>
            </cb>
        </templ>
    )
}

console.log(generate({}));