import React from "react";
import {
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TikTokFilled,
} from "@ant-design/icons";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-between items-start">
          {/* Branding and Address Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h1 className="text-3xl font-bold mb-4">Angkor Restaurant</h1>
            <p className="mb-2">st. 271,Meanchey, Phnom Penh, Cambodia</p>
           
          </div>

          
          {/* Social Media Section */}
          <div className="w-full lg:w-1/4 text-center lg:text-right p-3">
            <div className="flex justify-center lg:justify-end space-x-4">
              <a href="#" aria-label="GitHub" className="hover:text-white">
                <TikTokFilled className="text-2xl" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                <TwitterOutlined className="text-2xl" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-white">
                <FacebookOutlined className="text-2xl" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <InstagramOutlined className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} <span className="font-bold">Angkor  Restaurant</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
