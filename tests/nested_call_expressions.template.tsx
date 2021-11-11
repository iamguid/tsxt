export default function (ctx: any) {
    <templ>
        {['test1'].map(item1 => {
            let test: string = '';
            {['test2'].forEach(item2 => {
                test = item2;

                return (
                    <templ>
                        {`${item1}`}
                        {`${test}`}
                        {'test3'}
                    </templ>
                )
            })}
        })}
    </templ>
}