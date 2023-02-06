interface FooterProps {
  className: string;
}

export default function Footer(props: FooterProps) {
  return (
    <div className={props.className}>Footer</div>
  )
}