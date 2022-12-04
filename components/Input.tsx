import TextareaAutosize from 'react-textarea-autosize';
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #1B1B1B;
  padding: 6px 0;
`;

const Upload = styled.div`
  display: inline-block;
  vertical-align: bottom;
  label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 34px;
    svg {
      display: block;
    }
  }
  input {
    display: none;
  }
`;

const Textarea = styled.div`
  display: inline-block;
  vertical-align: bottom;
  width: calc(100% - 100px);
  > textarea {
    display: block;
    background: #060606;
    border-radius: 20px;
    border: 1px solid transparent;
    box-shadow: none;
    box-sizing: border-box;
    color: #828282;
    font-size: 13px;
    height: 32px;
    line-height: 18px;
    outline: none;
    padding: 6px 14px 8px;
    resize: none;
    width: 100%;
    overflow: hidden;
    font-family: inherit;
  }
`;

const SendButton = styled.div`
  display: inline-block;
  vertical-align: bottom;
  button {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 54px;
    height: 34px;
  }
`;


export default function Input() {
    return <Container>
        <Upload>
            <label htmlFor="file-upload" className="pn-msg-input__fileLabel" title="Add a file">
                <svg xmlns="http://www.w3.org/2000/svg" overflow="visible" preserveAspectRatio="none"
                     viewBox="0 0 24 24" width="20" height="20">
                    <path
                        d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                        fill="#828282" vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </label>
            <input type="file" id="file-upload"/>
        </Upload>
        <Textarea>
            <TextareaAutosize
                minRows={1}
                maxRows={7}
                placeholder={'Сообщение'}
            />
        </Textarea>
        <SendButton>
            <button className="pn-msg-input__send false" title="Send">
                <svg xmlns="http://www.w3.org/2000/svg" overflow="visible" preserveAspectRatio="none"
                     viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#828282" vectorEffect="non-scaling-stroke" d="m2 21 21-9L2 3v7l15 2-15 2z"/>
                </svg>
            </button>
        </SendButton>
    </Container>
}
