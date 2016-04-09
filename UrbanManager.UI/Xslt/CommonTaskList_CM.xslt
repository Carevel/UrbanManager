<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:import href="OperationButton_CM.xslt"/>
  <xsl:template match="/">
    <xsl:choose>
      <xsl:when test="taskCollection[@count &gt; 0]">
        <xsl:call-template name="tplList"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="tplNone"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="tplNone">
    <div style="width:100%; text-align:center; ">
      <img  src="../Images_flat/nodata.png"/>
    </div>
  </xsl:template>
  <xsl:template name="tplList">
    <div style="width: 100%; height: 25px; background-color: #e7eff4">
      <table style="width: 100%; height: 25px;">
        <tr>
          <td style="width: 8px; height: 25px; background-color: #fff"></td>
          <td style="width: 228px; height: 25px;"></td>
          <td>
            接报时间 / 所属街道
          </td>
          <td>
            诉求联系人 / 发生地址
          </td>
          <td>
            案件类别 / 主责部门
          </td>
          <td style="width: 72px;"></td>
          <td style="width: 95px;">
            案件操作
          </td>
        </tr>
      </table>
    </div>
    <div style="height: 6px;"></div>
    <div id="tasklistdiv" style="overflow-x: hidden; overflow-y: auto;">
      <xsl:for-each select="taskCollection/taskInfo">
        <xsl:variable name="taskType">
          <xsl:if test="/taskCollection/@categoryId='4'">2</xsl:if>
          <xsl:if test="/taskCollection/@categoryId='13'">1</xsl:if>
        </xsl:variable>
        <xsl:if test="position()!='1'">
          <div style="height: 6px;"></div>
        </xsl:if>
        <div style="height: 100px; border-right: 1px solid #acdfff; background: url(../Images_flat/tasklistimg/taskbg.jpg)">
          <table class="taskinfo">
            <tr>
              <td rowspan="5" style="width: 8px; background-color: #fff;">
                <div style="width: 1px; height: 100px; background-color:#acdfff; float:right; ">
                </div>
              </td>
              <td style="width: 228px; height: 2px;"></td>
              <td></td>
              <td></td>
              <td></td>
              <td style="width: 120px;"></td>
              <td style="width: 95px;"></td>
            </tr>
            <tr>
              <td style="height: 23px;">
                <div style="float: left; margin: -2px 0 0 -1px; width: 21px; height: 25px;">
                </div>
                &#160;&#160;<span style="font-weight: bold;">
                  任务号&#160;&#160; <a href="javascript:DisplayInfo2('{taskId}')" >
                    <xsl:value-of select="taskId"/>
                  </a>
                </span>
              </td>
              <td>
                <xsl:choose>
                  <xsl:when test="IsCountAllTime!='0'">
                    <xsl:if test="TotalAlarmLight='1'">
                      <div title="{TotalAlarmLightTip}" class="taskicon" style="margin-right:0px; float: left;background: url(../Images_flat/tasklistimg/level1.jpg) no-repeat">
                      </div>
                    </xsl:if>
                    <xsl:if test="TotalAlarmLight='2'">
                      <div title="{TotalAlarmLightTip}"  class="taskicon"  style="margin-right:0px; float: left;background: url(../Images_flat/tasklistimg/level2.jpg) no-repeat">
                      </div>
                    </xsl:if>
                    <xsl:if test="TotalAlarmLight='3'">
                      <div title="{TotalAlarmLightTip}"  class="taskicon"  style="margin-right:0px;float: left;background: url(../Images_flat/tasklistimg/level3.jpg) no-repeat">
                      </div>
                    </xsl:if>
                    <xsl:if test="TotalAlarmLight='4'">
                      <div title="{TotalAlarmLightTip}"  class="taskicon"  style="margin-right:0px;float: left; background: url(../Images_flat/tasklistimg/level4.jpg) no-repeat">
                      </div>
                    </xsl:if>
                  </xsl:when>
                  <xsl:otherwise>
                    <div style="float: left; margin: -2px 0 0 -1px; width: 21px; height: 25px;">
                    </div>
                  </xsl:otherwise>
                </xsl:choose>
                <span id="spanAlarmLight_{taskId}">
                </span>
                <span id="spanLock_{taskId}">
                </span>
                <span id="divSwitch_{taskId}">
                </span>
                <span id="spanSMS_{taskId}">
                </span>
                <xsl:choose>
                      <xsl:when test="/taskCollection/@categoryId='0' or /taskCollection/@categoryId='0S' or /taskCollection/@categoryId='7B' or /taskCollection/@categoryId='6' or /taskCollection/@categoryId='7'">
                        <xsl:if test="verifyResult='0'">
                          <img class="taskicon" src="../Images_flat/taskicon/bsh.jpg" title="不属实"/>
                        </xsl:if>
                        <xsl:if test="verifyResult='1'">
                          <img class="taskicon" src="../Images_flat/taskicon/sh.jpg" title="属实"/>
                        </xsl:if>
                      </xsl:when>
                    </xsl:choose>
                    <xsl:choose>
                      <xsl:when test="/taskCollection/@categoryId='8' or /taskCollection/@categoryId='8S'or /taskCollection/@categoryId='9' or /taskCollection/@categoryId='9S' or /taskCollection/@categoryId='14' or /taskCollection/@categoryId='15'">
                        <xsl:if test="checkResult='0'">
                          <img class="taskicon" src="../Images_flat/taskicon/hcbtg.png" title="核查不通过"/>
                        </xsl:if>
                        <xsl:if test="checkResult='1'">
                          <img class="taskicon" src="../Images_flat/taskicon/hctg.png" title="核查通过"/>
                        </xsl:if>
                      </xsl:when>
                    </xsl:choose>
                    <!--<xsl:if test="overTime='1'">
                    <img src="../Images/main_OverTime.png" title="已过期"/>
                  </xsl:if>-->
                    <xsl:if test="deptTag='1'">
                      <img class="taskicon" src="../Images_flat/taskicon/zb.jpg" title="主办单位"/>
                    </xsl:if>
                    <xsl:if test="deptTag='0'">
                      <img class="taskicon" src="../Images_flat/taskicon/xb.jpg" title="协办单位"/>
                    </xsl:if>
                    <xsl:if test="hasBack='1'">
                      <img class="taskicon" src="../Images_flat/taskicon/bth.jpg" title="被退回"/>
                    </xsl:if>
                    <!--<xsl:if test="hasLead='1'">
                    <img src="../Images/leaderchecked.png" title="领导督办"/>
                  </xsl:if>-->
                    <xsl:if test="hasLeadType='1'">
                      <img class="taskicon" src="../Images_flat/taskicon/db.jpg" title="领导督办"/>
                    </xsl:if>
                    <xsl:if test="hasLeadType='2'">
                      <img class="taskicon" src="../Images_flat/taskicon/db.jpg" title="跟踪督办"/>
                    </xsl:if>
                    <xsl:if test="hasLeadType='3'">
                      <img class="taskicon" src="../Images_flat/taskicon/db.jpg" title="检查问责"/>
                    </xsl:if>
                    <xsl:if test="hasLeadType='4'">
                      <img class="taskicon" src="../Images_flat/taskicon/db.jpg" title="分管领导督办"/>
                    </xsl:if>
                    <xsl:if test="HasTentypeCount>'0'">
                      <img class="taskicon" src="../Images_flat/taskicon/cb.jpg" title="催办"/>
                    </xsl:if>
                    <xsl:choose>
                      <xsl:when test="/taskCollection/@categoryId='7' or /taskCollection/@categoryId='7B' or /taskCollection/@categoryId='8'or /taskCollection/@categoryId='8S'or /taskCollection/@categoryId='9' or /taskCollection/@categoryId='9S' or /taskCollection/@categoryId='9A'">
                        <xsl:if test="isDisDeptType='0'">
                          <img class="taskicon" src="../Images_flat/taskicon/px.jpg" title="上级派遣"/>
                        </xsl:if>
                        <xsl:if test="isDisDeptType='1'">
                          <img class="taskicon" src="../Images_flat/taskicon/ps.jpg" title="下级上报"/>
                        </xsl:if>
                      </xsl:when>
                    </xsl:choose>
                    <xsl:if test="SimilarCaseSN!=''">
                      <img class="taskicon" src="../Images_flat/taskicon/cf.jpg" id="similarimg" onclick="SimilarCase.ShowDetail('similarimg','{taskId}');" title="重复案件"/>
                    </xsl:if>
                    <xsl:if test="IsFeedBack='1'">
                      <img class="taskicon" src="../Images_flat/taskicon/yfk.jpg"  title="已反馈"/>
                    </xsl:if>
                    <xsl:if test="IsCheckResult='1'">
                      <img class="taskicon" src="../Images_flat/taskicon/yqg.jpg"  title="延期过"/>
                    </xsl:if>
                    <xsl:if test="IsStubborn='1'">
                      <img class="taskicon" src="../Images_flat/taskicon/yn.jpg"  title="疑难顽症"/>
                    </xsl:if>
                    <xsl:if test="IsTypical='1'">
                      <img class="taskicon" src="../Images_flat/taskicon/dx.jpg"  title="典型案件"/>
                    </xsl:if>
                    <xsl:if test="SpecialSign!=''">
                      <img class="taskicon" src="../Images_flat/taskicon/ts.jpg"  title="{SpecialSign}"/>
                    </xsl:if>
                    <img class="taskicon" style="display:none" id="img_{taskId}" src="../Images_flat/taskicon/yfj.png"  title="有附件"/>
              </td>
              <td>
                关联单号:<span title="{HotLinkSN} ">
                  <xsl:choose>
                    <xsl:when  test="InfoSourceid='10'">
                      <a href="javascript:Open12345case('{HotLinkSN}')" >
                        <xsl:choose>
                          <xsl:when test="string-length(HotLinkSN) &gt; 14">
                            <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:value-of select="HotLinkSN"/>
                          </xsl:otherwise>
                        </xsl:choose>
                      </a>
                    </xsl:when>
                    <xsl:when  test="InfoSourceid='15'">
                      <xsl:choose>
                        <xsl:when test="string-length(HotLinkSN) &gt; 14">
                          <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="HotLinkSN"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:when>
                    <xsl:when  test="InfoSourceid='37'">
                      <xsl:choose>
                        <xsl:when test="string-length(HotLinkSN) &gt; 14">
                          <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="HotLinkSN"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:when>
                    <xsl:when  test="InfoSourceid='34' or InfoSourceid='35'">
                      <xsl:choose>
                        <xsl:when test="string-length(HotLinkSN) &gt; 14">
                          <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="HotLinkSN"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:choose>
                        <xsl:when test="string-length(HotLinkSN) &gt; 14">
                          <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="HotLinkSN"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:otherwise>
                  </xsl:choose>
                </span>
              </td>
              <td>
                <xsl:choose>
                  <xsl:when test="InfoSourceid='10'">
                    业务类型:
                    <xsl:if test="servicetype='0'">咨询</xsl:if>
                    <xsl:if test="servicetype='1'">求助</xsl:if>
                    <xsl:if test="servicetype='2'">投诉</xsl:if>
                    <xsl:if test="servicetype='3'">意见建议</xsl:if>
                    <xsl:if test="servicetype='4'">表扬</xsl:if>
                    <xsl:if test="servicetype='5'">其他</xsl:if>
                  </xsl:when>
                </xsl:choose>
              </td>
              <td colspan="2">
                截止时间:
                <xsl:choose>
                  <xsl:when test="IsCountAllTime!='0' and UserDeptType!='4'">
                    <span class="commonText2">
                      <xsl:value-of select="concat('20',substring(substring-after(TotalAlarmLightTip,'20'),1,14) )"/>
                    </span>
                  </xsl:when>
                  <xsl:otherwise>
                    <span id="Cateendtime_{taskId}"></span>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
            <tr style="vertical-align: bottom">
              <td rowspan="3" valign="top"  >
                <div style="height:8px;"></div>
                <ul class="headertdul">
                  <li style="margin-left: 0px; margin-top: -8px;">
                    <img alt="" src="../Images_flat/tasklistimg/source1.png" />
                  </li>
                  <li style="margin-left: 0px;">
                    <xsl:choose>
                      <xsl:when test="InfoSourceNote='rx.jpg'">
                        <div style="width:89px; height:25px;background:url(../Images_flat/infosourceimg/rx.jpg) no-repeat ">
                          <span class="infoSourcespan" >
                            <xsl:value-of select="infoSource"/>
                          </span>
                        </div>
                      </xsl:when>
                      <xsl:otherwise>
                        <div style="width:89px; height:25px;background: url(../Images_flat/infosourceimg/wg.jpg) no-repeat ">
                          <span class="infoSourcespan" >
                            <xsl:value-of select="infoSource"/>
                          </span>
                        </div>
                      </xsl:otherwise>
                    </xsl:choose>
                  </li>
                  <li>
                    <div style=" width:59px; height:59px;">
                      <xsl:if test="(firstImage!='../Images_flat/NoUpPic.gif') and (firstImage!='../Images_flat/NoCheckPic.gif') ">
                        <img class="caseimg" alt="" src="{firstImage}" />
                      </xsl:if>
                    </div>
                  </li>
                  <li>
                    <xsl:choose>
                      <xsl:when test="firstSound=''">
                        <img alt=""  title="无声音文件"  src="../Images_flat/tasklistimg/media_.jpg" />
                      </xsl:when>
                      <xsl:otherwise>
                        <img alt=""  title="有声音文件"  onclick="PlayWave('{firstSoundUrl}');" src="../Images_flat/tasklistimg/media.jpg" />
                      </xsl:otherwise>
                    </xsl:choose>
                  </li>
                  <li>
                    <xsl:choose>
                      <xsl:when test="ISHasMsg='1'">
                        <img alt="" title="有新消息"  id="IsHasMsgImg_{taskId}"  onclick="MsgSolving.ShowDetail('IsHasMsgImg_{taskId}','{taskId}');"   src="../Images_flat/tasklistimg/msg.jpg" />
                      </xsl:when>
                      <xsl:otherwise>
                        <img alt=""  title="无新消息" src="../Images_flat/tasklistimg/msg_.jpg" />
                      </xsl:otherwise>
                    </xsl:choose>
                  </li>
                </ul>
              </td>
              <td style="height: 29px;">
                <span class="commonText2" title="接报时间:{discoverTime}">
                  <xsl:value-of select="discoverTime"/>
                </span>
                <!--<span title="{HotLinkSN} ">
                  <xsl:choose>
                    <xsl:when  test="InfoSourceid='10'">
                      <a href="javascript:Open12345case('{HotLinkSN}')" >
                        <xsl:choose>
                          <xsl:when test="string-length(HotLinkSN) &gt; 14">
                            <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:value-of select="HotLinkSN"/>
                          </xsl:otherwise>
                        </xsl:choose>
                      </a>
                    </xsl:when>
                    <xsl:when  test="InfoSourceid='15'">
                      <xsl:choose>
                        <xsl:when test="string-length(HotLinkSN) &gt; 14">
                          <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="HotLinkSN"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:when>
                    <xsl:when  test="InfoSourceid='37'">
                      <xsl:choose>
                        <xsl:when test="string-length(HotLinkSN) &gt; 14">
                          <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="HotLinkSN"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:when>
                    <xsl:when  test="InfoSourceid='34' or InfoSourceid='35'">
                      <xsl:choose>
                        <xsl:when test="string-length(HotLinkSN) &gt; 14">
                          <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="HotLinkSN"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:choose>
                        <xsl:when test="string-length(HotLinkSN) &gt; 14">
                          <xsl:value-of select="substring(HotLinkSN,0,14)"/>...
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="HotLinkSN"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:otherwise>
                  </xsl:choose>
                </span>-->
              </td>
              <td class="overflowtd">
                <xsl:choose>
                  <xsl:when  test="KeeperSN!=''">
                    <a title="监督员编号:{KEEPERNAME}-{KEEPERMOBILE}" style="color:#0868a4" href="javascript:ShowKeeperInfo('{KeeperSN}')" >
                      <xsl:value-of select="KeeperSN"/>
                    </a>
                  </xsl:when>
                  <xsl:otherwise>
                    <span class="commonText2" title="诉求联系人:{Reportersn}">
                      <xsl:value-of select="Reportersn"/>
                    </span>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
              <td class="overflowtd">
                <span class="commonText2" title="{CaseClass}">
                  <xsl:value-of select="smallClassName"/>
                </span>
              </td>
            </tr>
            <tr>
              <td class="overflowtd" style="height: 23px;">
                <span class="commonText2" title="所属街道:{Street}">
                  <xsl:value-of select="Street"/>
                </span>
              </td>
              <td class="overflowtd">
                <span class="commonText2" title="发生地址:{address}">
                  <xsl:value-of select="address"/>
                </span>
              </td>
              <td class="overflowtd">
                <xsl:choose>
                  <xsl:when test="DeptCode=UserDeptCode">
                    <span class="commonText2" title="{ExecuteDeptname}">
                      <xsl:value-of select="ExecuteDeptname"/>
                    </span>
                  </xsl:when>
                  <xsl:otherwise>
                    <span id="divLastDept_{taskId}"></span>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4" class="overflowtd" style="height: 23px; vertical-align: top">
                <span style="font-weight: bold;">问题描述：</span>
                <span class="commonText2" title="{description}">
                  <xsl:value-of select="description"/>
                </span>
              </td>
              <td>
                <xsl:call-template name="tplOperationButton"/>
              </td>
            </tr>
          </table>
        </div>
        <div class="watermarkdiv">
          <div style="float:right; width:162px; height:100px;" ></div>
          <!--12345水印-->
          <xsl:choose>
            <xsl:when test="InfoSourceid='10'">
              <xsl:if test="urgentdegree='1' and approach='1' and IsCallBack='Y' ">
                <img  src="../Images_flat/watermark/dbfhj.png"/>
              </xsl:if>
              <xsl:if test="urgentdegree='1' and approach='1' and IsCallBack!='Y' ">
                <img   src="../Images_flat/watermark/dbj.png"/>
              </xsl:if>
              <xsl:if test="urgentdegree='1' and approach!='1' and IsCallBack='Y' ">
                <img   src="../Images_flat/watermark/fhj.png"/>
              </xsl:if>
              <xsl:if test="urgentdegree='1' and approach!='1' and IsCallBack!='Y' ">
                <img   src="../Images_flat/watermark/jj.png"/>
              </xsl:if>
              <xsl:if test="urgentdegree!='1' and approach='1' and IsCallBack='Y' ">
                <img   src="../Images_flat/watermark/dbfh.png"/>
              </xsl:if>
              <xsl:if test="urgentdegree!='1' and approach='1' and IsCallBack!='Y' ">
                <img   src="../Images_flat/watermark/db.png"/>
              </xsl:if>
              <xsl:if test="urgentdegree!='1' and approach!='1' and IsCallBack='Y' ">
                <img   src="../Images_flat/watermark/fh.png"/>
              </xsl:if>
            </xsl:when>
          </xsl:choose>
          <!--110水印-->
          <xsl:if test="ReportSource='110'">
            <img   title="110上报" src="../Images_flat/watermark/110sb.png"/>
          </xsl:if>
          <xsl:if test="infoTypeID='1' and ( bigClass='92' or bigClass='93' ) and SonClass='02' ">
            <img   title="在建" src="../Images_flat/watermark/zj.png"/>
          </xsl:if>
          <xsl:if test="infoTypeID='1' and ( bigClass='92' or bigClass='93' ) and SonClass='03' ">
            <img   title="已建" src="../Images_flat/watermark/yj.png"/>
          </xsl:if>
          <xsl:if  test="IsFast='1' ">
            <img   src="../Images_flat/watermark/kssb.png"/>
          </xsl:if>
        </div>
        <script>
          TaskLock.ShowLockInfo('<xsl:value-of select="taskId"/>');
          <xsl:if test="DeptCode!=UserDeptCode">
            ShowCommontasklist.ShowExecuteDept('divLastDept_<xsl:value-of select="taskId"/>','<xsl:value-of select="taskId"/>');
          </xsl:if>
          <xsl:if test="/taskCollection/@categoryId='4' or /taskCollection/@categoryId='13'">
            PdaReceived.ShowSwitch('divSwitch_<xsl:value-of select="taskId"/>','<xsl:value-of select="taskId"/>','<xsl:value-of select="$taskType"/>');
          </xsl:if>
          ShowCommontasklist.ShowAlarmInfo('<xsl:value-of select="taskId"/>','<xsl:value-of select="/taskCollection/@categoryId"/>','<xsl:value-of select="UpdateTime"/>','<xsl:value-of select="solvingId"/>','<xsl:value-of select="DeptCode"/>',"jpg",'<xsl:value-of select="InfoSourceid"/>','<xsl:value-of select="MainIsStandard"/>');
          ShowCommontasklist.ShowExistFile('<xsl:value-of select="taskId"/>');
          ShowCommontasklist.ShowSMS('<xsl:value-of select="taskId"/>');
        </script>
      </xsl:for-each>
    </div>
  </xsl:template>
</xsl:stylesheet>

