export default function generate(ctx: any) {
    return (
        <templ>
            {'test1'}
            <indent>
                {'test2'}
            </indent>
            <indent>
                {'test3'}
                <indent>
                    {'test4'}
                    <ln />
                    {'test5'}
                    {'test6'}
                </indent>
            </indent>
        </templ>
    )
}

console.log(generate({}))