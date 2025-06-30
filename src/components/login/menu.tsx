export const MenoLogin = () => {
  return (
    <div>
      <ul
        style={{ direction: "rtl" }}
        className="flex text-xl gap-5 p-4 text-newblack500 justify-center items-center"
      >
        <li>خانه</li>
        <li>قوانین</li>
        <li>راهنما</li>
        <li>تماس با ما</li>
        <li>
          <div style={{ display: "flex", gap: "8px" }}>
            <img src="./Group.png" alt="Group" />
            <img src="./abr.png" alt="ABR" />
          </div>
        </li>
      </ul>
    </div>
  );
};
