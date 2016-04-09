<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <table  class="tablelist" cellpadding="0" cellspacing="1" style="width:620px;" id="MsgTable">
      <tr class="listTrTitle">
        <th style="width:120px;" >部门</th>
        <th style="width:250px;">内容</th>
        <th style="width:90px;">类别</th>
        <th style="width:60px;">发送人</th>
        <th style="width:100px;">发送时间</th>
    </tr>
      <xsl:choose>
        <xsl:when test="count(ObjectList/MsgSolvingInfo) &gt; 0">
          <xsl:call-template name="tplItem"></xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:call-template name="tplNone"/>
        </xsl:otherwise>
      </xsl:choose>
    </table>
  </xsl:template>
  <xsl:template name="tplNone">
    <tr class="listTr1">
      <td colspan="5">消息已被读取</td>
    </tr>
  </xsl:template>
  <xsl:template name="tplItem">
    <xsl:for-each select="ObjectList/MsgSolvingInfo">
      <tr class="listTr1">
        <td>
          <xsl:value-of select="deptCode"/>
        </td>
        <td style="font-size:11px;">
          <xsl:value-of select="content"/>
        </td>
        <td style="font-size:11px;">
          <xsl:value-of select="msgType"/>
        </td>
        <td style="font-size:11px;">
          <xsl:value-of select="insertUser"/>
        </td>
        <td style="font-size:11px;">
          <xsl:value-of select="insertTime"/>
        </td>
      </tr>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>