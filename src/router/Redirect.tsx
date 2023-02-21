import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
}
export function Redirect({ to }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
}