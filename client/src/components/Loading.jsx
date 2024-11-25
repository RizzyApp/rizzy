import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex flex-col-items-center">
      <ThreeDots height="100" width="100" radius="9" color="#fff" ariaLabel="three-dots-loading" wrapperStyle={{}} visible={true} />
    </div>
  );
};

export default Loading;
