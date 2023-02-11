import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from 'axios'

// css
import '../../../Assets/Styles/pages/FileUpload.css'
// antd
import { Avatar, Badge, Spin } from 'antd';


const FileUpload = ({ values, setValues, loading, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }))

    const handleChangeFile = (e) => {
        const files = e.target.files;
        if (files) {
            if (files.length > 10) {
                alert('You can only select a maximum of 5 files');
                e.target.value = null;  // clear the selected files
            } else {
                setLoading(true)
                let allfileUpload = values.images

                for (let i = 0; i < files.length; i++) {
                    Resize.imageFileResizer(
                        files[ i ],
                        720,
                        720,
                        'JPEG',
                        100,
                        0,
                        (uri) => {
                            axios.post(process.env.REACT_APP_API + '/images', {
                                image: uri,
                            }, {
                                headers: {
                                    authtoken: user.token,
                                }
                            }).then(res => {
                                setLoading(false)
                                allfileUpload.push(res.data);
                                console.log(allfileUpload)
                                setValues({ ...values, images: allfileUpload })
                            }).catch(err => {
                                setLoading(false)
                                console.log(err)
                            })
                        },
                        "base64"
                    );
                }
            }

        }
    };

    const handleRemove = (public_id) => {
        setLoading(true)
        const { images } = values
        axios.post(process.env.REACT_APP_API + '/removeimages',
            { public_id },
            {
                headers: {
                    authtoken: user.token
                }
            }
        ).then(res => {
            setLoading(false)
            let filterImages = images.filter(item => {
                return item.public_id !== public_id
            })
            setValues({ ...values, images: filterImages })
        }).catch(err => {
            setLoading(false)
        })
    }


    return (
        <>
            <div className="form-group">
                <input
                    onChange={handleChangeFile}
                    className="form-control"
                    type="file"
                    multiple
                    accept="images/*"
                    name="file"
                    max={10}
                />
                {loading
                    ? <label className="mt-1">Loading... <Spin size="small" /></label>
                    : <label className="mt-1">Choose image to upload...</label>
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                {values.images && values.images.map((c, index) =>
                    <span key={index} className="avatar-item">
                        <Badge
                            onClick={() => handleRemove(c.public_id)}
                            className='removeImage-badge'
                            count='X'>
                            <Avatar
                                src={c.url}
                                alt={c.url}
                                shape="square"
                                size={120} />
                        </Badge>
                    </span>
                )}
            </div>
        </>
    );
};

export default FileUpload;
