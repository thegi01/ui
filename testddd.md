# iOS 인수 인계 자료



## SVN

* #### 링크 주소 : svn://10.52.26.63/mcoupon_src/com.lottemart.mcoupon.iphone
* #### 디렉토리 구조
<pre>
    com.lottemart.mcoupon.iphone ---------- branches   --------------- com.lottemart.mcoupon.iphone.dev               - 2.3.1 개발 서버 버전
                                      |                       |
                                      |                       |------- com.lottemart.mcoupon.iphone.trunk             - 2.3.1 실제 개발 소스
                                      |                       |
                                      |                       |------- com.lottemart.mcoupon.iphone.staging           - 2.3.1 스테이징 서버 버전
                                      |
                                      |
                                      |
                                      |
                                      |----- tag       --------------- 2.2.9                                          - 2.2.9 trunk 소스
                                      |                       |
                                      |                       |------- 2.3.0                                          - 2.3.0 trunk 소스
                                      |                       |
                                      |                       |------- 2.3.1                                          - 2.3.1 trunk 소스
                                      |
                                      |
                                      |----- trunk                                                                    - 현재 스토어 버전(2.3.1)
</pre>
* #### 계정 : psmever / Qazwsx1!

* 다운 받는 법 : <br>
<code>$ svn checkout svn://10.52.26.63/mcoupon_src/com.lottemart.mcoupon.iphone/branches/com.lottemart.mcoupon.iphone.dev</code> <br>

    >현 svn 에 pod 관련 파일 들이 업로드 되어 있지 않기 때문에 최초 다운 로드시에는   <code>  #pod update </code> 해주셔야 합니다. <br>
    >맥에서 commit 한것 중에 윈도우에서 SVN 로그 메시지를 보면 한글이 깨진것들이 가끔 있습니다. 이건 방법을 못찾아서... 로그 메시지를 보시려면 맥에서 로그를 보면 깨지지 않을 꺼에요~



## 롯데마트 APP Store 계정 정보
* https://developer.apple.com
* 롯데마트
    * ID : `lottemartmall@gmail.com`
    * password : `Mobile2015`
* 펜타웍스
    * ID : `ios_devman@pentaworks.xyz`
    * password : `PENTAworks2015!@#`


## com.lottemart.mcoupon.iphone 앱 정보

* 서버 설정 ( Production, Developer, Staging )
    * 서버 URL
        * Production : http://m.coupon.lottemart.com
        * Developer : http://m.coupond.lottemart.com
        * Staging : http://m.coupons.lottemart.com

    * 설정 파일 위치
        * LotteSmartCoupon
            * <code>/LotteTestProject/LotteSmartCoupon-Prefix.pch</code>
        * Widget
            * <code>/today-extension/WidgetProperty.swift</code>
    * 설정 방법
        * LotteSmartCoupon
        <pre>
            #define DEV_MODE         0 // 개발 테스트시 1 PROD_MODE 0, STAGING_MODE 0
            #define PROD_MODE        1  // 스토어 배포시 1 DEV_MODE 0 , STAGING_MODE 0
            #define STAGING_MODE     0  // 스테이징서버 배포시 1 DEV_MODE 0, PROD_MODE 0<br><br>
            # 필요한 서버 버전에 1 또는 0 으로 바꾸고 빌드 하면 됩니다.

        </pre>

        * Widget
        <pre>
            import Foundation
            let PROD = true<br><br>
            # PROD 를 true 이면 운영 버전 false 이면 개발 버전 입니다.
            # staging 은 따로 설정 하지 않았습니다.
        </pre>

* App bundle ID 정보

    * 롯데마트 ( 실제 운영 및 스토어 업로드시 )
        * Team : <code>LotteShopping Ltd. LotteMART</code>
        * bundle URL identifier : <code>com.lottemart.mcoupon.iphone</code>
        * bundle URL Schemes : <code>lottemart-mcoupon-iphone</code>
        * group
            * <code>group.lottemart</code>
            * <code>group.com.lottemart.mcoupon.iphone</code>

    * 펜타웍스 ( 개발 및 스테이징 )
        * 개발
            * Team : <code>Team Keesuk Bae</code>
            * bundle URL identifier : <code>xyz.pentaworks.mcoupon.iphone.dev</code>
            * bundle URL Schemes : <code>pentaworks-mcoupon-iphone-dev</code>
            * group : <code>group.xyz.pentaworks.mcoupon.iphone.dev</code>

        * 스테이징
            * Team : <code>Team Keesuk Bae</code>
            * bundle URL identifier : <code>xyz.pentaworks.mcoupon.iphone.stag</code>
            * bundle URL Schemes : <code>pentaworks-mcoupon-iphone-stag</code>
            * group : <code>group.xyz.pentaworks.mcoupon.iphone.dev.group</code>

## 스토어 업로드시

> 스토어 업로드시 회원 가입 등을 막아야합니다. <br>
> APP 에서 막는건 아니고 FRONT 쪽에서 막야줘야 합니다. <br>
> 스토어에 올라갈 최종 버전을 업로드 하고 난후 아래 HTML 을 수정한후 반영하고<br>
> 심사를 제출한후 심사가 통과 확인 한후 출시 버튼 누르기 전 HTML 을 다시 원복 하고 출시 버튼을 누르시면 됩니다.<br>

* 순서
    1. 최종 버전 스토어에 업로드
    2. FRONT 에서 회원 가입, 정보 수정 등의 페이지를 수정한 HTML 반영
    3. 심사 재출
    4. 심사 통과 확인
    5. FRONT 원복
    6. 출시


* FRONT 회원 가입 막는 HTML ( IOS 만 해당 )
    * 회원 가입 버튼 보이지 않게
        * http://m.coupon.lottemart.com/index.html
    * 앱 설정 페이지에서 회원 정보와 관련 링크 클릭 했을때 페이지 이동 하지 않게
        * http://m.coupon.lottemart.com/lpoint_door.html
    * 로그인 페이지에 비번 찾기 등 보이지 않게
        * http://m.coupon.lottemart.com/application/sign/signIn.html

* 심사 통과후 서버팀 쪽에 이야기 해서 현재 업데이트 버전을 디비에 insert 해줘야 합니다.




