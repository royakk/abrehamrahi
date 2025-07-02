interface MenoLoginProps {
  sm?: boolean;
}

export const MenoLogin = ({ sm = false }: MenoLoginProps) => {
  return (
    <div>
      <ul
        style={{ direction: "rtl" }}
        className={`flex gap-6 p-4 justify-center  items-center  text-sm "
        } text-newblack500`}
      >
        <li>خانه</li>
        <li>قوانین</li>
        <li>راهنما</li>
        <li>تماس با ما</li>
        <li>
          <div className={`${sm ? "hidden" : "flex"} gap-2`}>
            <img src="./Group.png" alt="Group" />
            <img src="./abr.png" alt="ABR" />
          </div>
        </li>
      </ul>
    </div>
  );
};
