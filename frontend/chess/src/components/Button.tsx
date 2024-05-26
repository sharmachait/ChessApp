type buttonProps = {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
};
const Button = (props: buttonProps) => {
  return (
    <button
      className="bg-purple-200 font-semibold block mt-4 max-h-20 rounded-lg px-8 py-4 text-[#0B132B]"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
