/* eslint-disable */
import "../src/index";

const CustomWithChildren = (props: any, children: any[]) => (
  <templ>
    {children}
    {`inside`}
  </templ>
);

export default () => (
  <templ>
    <CustomWithChildren>
      {`test1`}
      {`test2`}
      {[3, 4].map((item) => "test" + item.toString()).join("")}
      <CustomWithChildren>
        <templ>
          {`test5`}
          {`test6`}
          {[7, 8].map((item) => "test" + item.toString()).join("")}
        </templ>
      </CustomWithChildren>
    </CustomWithChildren>
  </templ>
);
