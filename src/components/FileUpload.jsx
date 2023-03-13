// import React from 'react'

// const FileUpload = () => {
//   return (
//     <div>
//       <Modal
//         title="Edit Region"
//         okText="Edit"
//         style={{ top: 20 }}
//         visible={state.modalVisible}
//         okButtonProps={{ loading: state.updateLoading }}
//         onOk={(e) => {
//           e.preventDefault();
//           handleEditImageUpload(
//             _id._id,
//             state?.regions?.find((el) => el._id === _id._id)
//           );
//           setState({ ...state, modalVisible: false });
//         }}
//         onCancel={() => setState({ ...state, modalVisible: false })}
//       >
//         <form>
//           <label>Title</label>
//           <TextArea
//             rows={4}
//             onChange={(e) => handleSubmit("title", e.target.value)}
//             value={
//               state?.regions?.find((el) => el._id === _id._id)?.title || ""
//             }
//             name="title"
//           />
//           <label>Description</label>
//           <TextArea
//             rows={6}
//             onChange={(e) => handleSubmit("description", e.target.value)}
//             value={
//               state?.regions?.find((el) => el._id === _id._id)?.description ||
//               ""
//             }
//             name="description"
//           />
//           <br />
//           <br />
//           <Upload
//             accept="image/*"
//             beforeUpload={(file) => {
//               handleChange("image", file);
//               return false; // prevent Ant Design from automatically uploading the file
//             }}
//             fileList={state.newRegion.image ? [state.newRegion.image] : []}
//             name="image"
//           >
//             <Button icon={<AiOutlineUpload />}>Upload Image</Button>
//           </Upload>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default FileUpload
