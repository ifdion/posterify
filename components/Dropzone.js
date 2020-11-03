import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Dropzone(props) {
  const onDrop = useCallback(acceptedFiles => {
    props.onDrop && props.onDrop(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the image here ...</p> :
          <p>Drop an image here, or click to select a file</p>
      }
    </div>
  )
}