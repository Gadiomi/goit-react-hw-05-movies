import ContentLoader from 'react-content-loader';

const MyLoader = props => (
  <ContentLoader
    speed={2}
    width={1340}
    height={400}
    viewBox="0 0 1340 400"
    backgroundColor="#ecebeb"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="228" y="10" rx="10" ry="10" width="400" height="40" />
    <rect x="231" y="60" rx="10" ry="10" width="150" height="30" />
    <rect x="230" y="101" rx="20" ry="20" width="100" height="30" />
    <rect x="5" y="8" rx="0" ry="0" width="200" height="300" />
    <rect x="231" y="135" rx="10" ry="10" width="1092" height="72" />
    <rect x="234" y="224" rx="20" ry="20" width="80" height="30" />
    <rect x="231" y="271" rx="10" ry="10" width="400" height="24" />
    <rect x="6" y="311" rx="10" ry="10" width="80" height="20" />
    <rect x="7" y="338" rx="10" ry="10" width="80" height="20" />
    <rect x="7" y="363" rx="10" ry="10" width="80" height="20" />
  </ContentLoader>
);

export default MyLoader;
