import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollT() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // No smooth animation
    });
  }, [pathname]);

  return null;
}

export default ScrollT;
