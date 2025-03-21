import { ModalProps } from '@/source/03-components/Modal/Modal';

const modalArgs = {
  defaultOpen: true,
  id: '1234',
  title: 'Modal Title',
  children: (
    <>
      <p>
        Irure cillum laborum proident in nulla duis sint cillum esse minim.
        Aliqua non ea reprehenderit aliqua labore dolor adipisicing et aliquip
        ea occaecat elit nostrud. Esse aliquip tempor ex tempor deserunt.
        Commodo sunt minim fugiat non.
      </p>
      <p>
        Irure aliqua reprehenderit ut pariatur culpa consequat ad reprehenderit
        consequat exercitation ut commodo. Tempor et consectetur mollit aliquip
        Lorem duis voluptate cillum aliquip adipisicing do reprehenderit.
        Cupidatat dolor enim labore est. Aliquip dolor aliquip dolore pariatur
        consectetur cillum officia sunt anim et non.
      </p>
      <a href="#0">Read More</a>
    </>
  ),
} satisfies ModalProps;
export default modalArgs;
