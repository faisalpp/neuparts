import React, { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi';
import MainLayout from '../../layout/MainLayout'
import { ProfileData } from './Profile';
import { OrderHistoryData } from './OrderHistory';
import { MyFavouriteData } from './MyFavourite';
import { SavedAddressData } from './SavedAddress';
import { BillingInformationData } from './BillingInformation';
import { ChangePasswordData } from './ChangePassword';
import { EmailPreferencesData } from './EmailPreferences';


const MobileMyAccount = () => {
    const [isMobile, setIsDesktop] = useState(window.innerWidth <= 992);
    const [activeTab, setActiveTab] = useState();

    const myaccounts = [
        { title: 'Profile', content: ProfileData },
        { title: 'Order History', content: OrderHistoryData },
        { title: 'My Favourites', content: MyFavouriteData },
        { title: 'Saved Addresses ', content: SavedAddressData },
        { title: 'Billing Information', content: BillingInformationData },
        { title: 'Change Password', content: ChangePasswordData },
        { title: 'Email Preferences', content: EmailPreferencesData },
    ]
    const handleTabClick = (index) => {
        setActiveTab(index)
    }


    // Mobile Version Only
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth <= 992);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const redirectPage = () => {
        location.href = '/'
    }
    return (
        <>
            {isMobile ?
                <MainLayout>
                    <div className='px-4 md:px-10 py-10'>
                        <h1 className='text-b18 font-bold text-32px'>My Account</h1>
                        <div className='w-full flex flex-col gap-6 mt-10'>
                            {myaccounts.map((item, index) => (
                                <MobileTabs key={index} title={item.title} activeClass={index === activeTab ? true : false} isOpen={index === activeTab} onClick={() => { handleTabClick(index) }}>
                                    <item.content />
                                </MobileTabs>
                            ))}
                        </div>
                    </div>
                </MainLayout>
                : redirectPage()}
        </>
    )
}

export default MobileMyAccount;



const MobileTabs = ({ title, isOpen, onClick, children, activeClass }) => {
    return (
        <div className={`duration-200 flex flex-col`} >
            <button
                onClick={onClick}
                className={`p-5 xl:p-6 xl:text-lg font-semibold flex justify-between border items-center text-left ${activeClass ? 'bg-b3 text-white border-b3 rounded-t-2xl' : 'border-b14 bg-white text-b1 rounded-2xl'}`}
            >
                <span>{title}</span>
                <FiChevronDown className={`duration-200 ${activeClass ? 'rotate-180' : ''}`} />
            </button>
            <div className={`${isOpen ? 'gap-6 p-5 max-h-full border border-b14 rounded-b-2xl' : 'max-h-0 select-none opacity-0 pointer-events-none'} duration-200`} >
                {children}
            </div>
        </div>
    );
}