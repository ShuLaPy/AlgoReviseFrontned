import { Modal } from "@mantine/core";

const ModalWrapper = ({ opened, close, component, title }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={title}
      closeOnClickOutside={false}
      closeOnEscape={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {component}
    </Modal>
  );
};

export default ModalWrapper;
