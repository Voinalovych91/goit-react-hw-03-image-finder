import { TailSpin } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{
        display: 'block',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      wrapperClass=""
      visible={true}
    />
  );
};
