const CustomWithChildren = (props: any, children: any[]) => (
    <templ>
        {children}
        {`test2`}
    </templ>
)

export default () => (
  <templ>
    <CustomWithChildren>
      {`test1`}
      {`test2`}
      {[3, 4].map(item => "test" + item.toString()).join('')}
    </CustomWithChildren>
  </templ>
)
