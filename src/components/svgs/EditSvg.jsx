import React from 'react';

const EditSvg = () => {
    const style = {
        maskType: "alpha"
    }
    return (
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="editSvg" style={style} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#00ADEE" />
                </mask>
                <g mask="url(#editSvg)">
                    <path d="M2 24.0002V20.0002H22V24.0002H2ZM4 18.0002V14.2502L13.05 5.20018L16.8 8.95018L7.75 18.0002H4ZM6 16.0002H6.9L14 8.95018L13.05 8.00018L6 15.1002V16.0002ZM17.925 7.85018L14.175 4.10018L15.975 2.30018C16.1583 2.10018 16.3917 2.00418 16.675 2.01218C16.9583 2.02085 17.1917 2.11685 17.375 2.30018L19.725 4.65018C19.9083 4.83351 20 5.06285 20 5.33818C20 5.61285 19.9083 5.85018 19.725 6.05018L17.925 7.85018Z" fill="#00ADEE" />
                </g>
            </svg>

        </>
    )
}

export default EditSvg
