const CustomWithChildren = (props: object, children: object[]) => (
  <templ>
    {children}
    {`inside`}
  </templ>
);

export default () => (
  <templ>
    <CustomWithChildren>
      <templ>
        {`test1`}
        {`test2`}
        {[3, 4].map((item) => "test" + item.toString())}
        <CustomWithChildren>
          <templ>
            {`test5`}
            {`test6`}
            {[7, 8].map((item) => "test" + item.toString())}
          </templ>
        </CustomWithChildren>
      </templ>
    </CustomWithChildren>
  </templ>
);
