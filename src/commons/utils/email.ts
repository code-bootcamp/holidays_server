import { UnprocessableEntityException } from '@nestjs/common';
import { getToday } from './util';

export function emailCheck(email) {
  if (
    email === undefined ||
    email.includes('@') === false ||
    email.split('@')[0].length >= 20
  ) {
    throw new UnprocessableEntityException('형식이 올바르지 않습니다!');
  } else {
    return true;
  }
}

export function welcomeTemplate({ email, name }) {
  const template = `
  <!DOCTYPE html>
  <html lang="ko">
    <body>
      <div style="margin: 0; padding: 0">
        <table
          width="720"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="margin: 0 auto"
        >
          <tbody>
            <tr>
              <td style="background: #fff">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td
                        style="
                          padding: 30px 40px 25px;
                          font-size: 1px;
                          line-height: 1px;
                          border-bottom: 2px #e0e0e0 solid;
                        "
                      >
                        <a
                          href="https://www.gabia.com/?utm_source=ems&amp;utm_medium=email&amp;utm_term=gabia&amp;utm_campaign=notice&amp;utm_content=CI"
                          title="새창"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=https://happyholidays.site/landingPage"
                          ><img
                            src="https://storage.googleapis.com/holidays-storage/KakaoTalk_Image_2023-05-12-13-28-14_001%201.png"
                            alt=""
                            style="vertical-align: top; border: none"
                            class="CToWUd"
                            data-bit="iit"
                        /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
  
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="width: 40px"></td>
                      <td style="padding: 40px 0 50px">
                        <div style="margin: 0; padding: 0">
                          <div class="adM"></div>
                        </div>
                        <table
                          width="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  font: 30px/40px Malgun Gothic;
                                  letter-spacing: -1px;
                                  color: #c96c08;
                                "
                              >
                                [홀리데이즈] 가입을 환영합니다!
                              </td>
                            </tr>
  
                            <tr>
                              <td
                                style="
                                  padding: 30px 0 25px;
                                  font: 16px/26px Malgun Gothic;
                                  color: #767676;
                                "
                              >
                                안녕하세요! ${name}님 가입을 환영합니다!
                              </td>
                            </tr>
  
                            <tr>
                              <td
                                style="
                                  padding-bottom: 10px;
                                  font: 16px/26px Malgun Gothic;
                                  color: #767676;
                                "
                              >
                                이름: ${name}<br />
                                email: ${email}<br />
                                가입일: ${getToday()}<br />
                              </td>
                            </tr>
                            <tr style="align-items: center"></tr>
                          </tbody>
                        </table>
                      </td>
                      <td style="width: 40px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>
	`;
  return template;
}

export function sendTokenTemplate({ token }) {
  const template = `
  <!DOCTYPE html>
  <html lang="ko">
    <body>
      <div style="margin: 0; padding: 0">
        <table
          width="720"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="margin: 0 auto"
        >
          <tbody>
            <tr>
              <td style="background: #fff">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td
                        style="
                          padding: 30px 40px 25px;
                          font-size: 1px;
                          line-height: 1px;
                          border-bottom: 2px #e0e0e0 solid;
                        "
                      >
                        <a
                          href="https://happyholidays.site/landingPage"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=https://happyholidays.site/landingPage"
                          ><img
                            src="https://storage.googleapis.com/holidays-storage/KakaoTalk_Image_2023-05-12-13-28-14_001%201.png"
                            alt=""
                            style="vertical-align: top; border: none"
                            class="CToWUd"
                            data-bit="iit"
                        /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
  
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="width: 40px"></td>
                      <td style="padding: 40px 0 50px">
                        <div style="margin: 0; padding: 0">
                          <div class="adM"></div>
                        </div>
                        <table
                          width="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  font: 30px/40px Malgun Gothic;
                                  letter-spacing: -1px;
                                  color: #c96c08;
                                "
                              >
                                [홀리데이즈] 인증번호입니다
                              </td>
                            </tr>
  
                            <tr>
                              <td
                                style="
                                  padding: 30px 0 25px;
                                  font: 16px/26px Malgun Gothic;
                                  color: #767676;
                                "
                              >
                                안녕하세요!
                              </td>
                            </tr>
  
                            <tr>
                              <td
                                style="
                                  padding-bottom: 10px;
                                  font: 16px/26px Malgun Gothic;
                                  color: #767676;
                                "
                              >
                              인증번호를 입력하여 인증 완료하세요<br />
                                인증번호는 아래를 확인하세요.<br />
                              </td>
                            </tr>
                            <tr style="align-items: center"></tr>
                          </tbody>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            width: 100%;
                            table-layout: fixed;
                            border-bottom: 1px #a5a5a5 solid;
                            word-break: break-all;
                            border-top: 3px #a5a5a5 solid;
                          "
                        >
                          <colgroup>
                            <col width="110" />
                            <col />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th
                                style="
                                  padding: 8px 0;
                                  font: bold 14px/20px Malgun Gothic;
                                  letter-spacing: -1px;
                                  color: #4b5964;
                                  text-align: center;
                                  background: #f3f3f3;
                                "
                              >
                                인증번호
                              </th>
                              <td
                                style="
                                  padding: 8px 10px;
                                  font: 14px/20px Malgun Gothic;
                                  color: #4b5964;
                                  color: #4b5964;
                                  border-left: 1px #e0e0e0 solid;
                                "
                              >
                                ${token}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td style="width: 40px"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>  
	`;
  return template;
}
