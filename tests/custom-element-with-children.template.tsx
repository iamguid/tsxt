/* eslint-disable */
import "../dist-lib/src/index";

const CustomWithChildren = (props: any, children: any[]) => (
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
