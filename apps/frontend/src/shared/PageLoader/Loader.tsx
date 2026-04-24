import './PageLoader.css';

const Loader = () => {
  return (
    <div className="page-loader" role="status" data-slot="loader">
      <div className="page-loader__mark" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Loader;
