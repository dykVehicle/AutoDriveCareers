import jsPDF from 'jspdf';
import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx';
import { saveAs } from 'file-saver';
import type { ResumeDoc } from './resume';

// 导出PDF - 使用jsPDF直接生成
export async function exportResumeToPDF(resume: ResumeDoc): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // 设置中文字体（使用系统默认字体）
  doc.setFont('helvetica');
  
  let yPos = 20;
  const lineHeight = 7;
  const pageHeight = 297;
  const margin = 20;

  // 添加文本的辅助函数
  const addText = (text: string, fontSize: number, style: 'normal' | 'bold' = 'normal') => {
    if (yPos > pageHeight - margin) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(fontSize);
    if (style === 'bold') {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    
    // 处理长文本换行
    const lines = doc.splitTextToSize(text, 170);
    for (const line of lines) {
      if (yPos > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin, yPos);
      yPos += lineHeight;
    }
  };

  const addSpace = (space: number = lineHeight) => {
    yPos += space;
  };

  // 标题 - 姓名
  addText(resume.basics.name || '候选人简历', 24, 'bold');
  addSpace(3);

  // 基本信息
  const basicInfo: string[] = [];
  if (resume.basics.title) basicInfo.push(resume.basics.title);
  if (resume.basics.city) basicInfo.push(resume.basics.city);
  if (resume.basics.email) basicInfo.push(resume.basics.email);
  if (resume.basics.phone) basicInfo.push(resume.basics.phone);
  if (basicInfo.length > 0) {
    addText(basicInfo.join(' | '), 10);
    addSpace();
  }

  // 个人简介
  if (resume.summary.length > 0) {
    addText('个人简介', 14, 'bold');
    addSpace(3);
    for (const item of resume.summary) {
      addText('• ' + item, 10);
    }
    addSpace();
  }

  // 技能
  if (resume.skills.length > 0) {
    addText('技能', 14, 'bold');
    addSpace(3);
    addText(resume.skills.join('、'), 10);
    addSpace();
  }

  // 工作经历
  if (resume.experience.length > 0) {
    addText('工作经历', 14, 'bold');
    addSpace(3);
    for (const exp of resume.experience) {
      const header = [exp.title, exp.time].filter(Boolean).join(' | ');
      addText(header, 12, 'bold');
      addSpace(2);
      for (const bullet of exp.bullets) {
        addText('• ' + bullet, 10);
      }
      addSpace();
    }
  }

  // 项目经历
  if (resume.projects.length > 0) {
    addText('项目经历', 14, 'bold');
    addSpace(3);
    for (const proj of resume.projects) {
      const header = [proj.title, proj.time].filter(Boolean).join(' | ');
      addText(header, 12, 'bold');
      addSpace(2);
      for (const bullet of proj.bullets) {
        addText('• ' + bullet, 10);
      }
      addSpace();
    }
  }

  // 教育经历
  if (resume.education.length > 0) {
    addText('教育经历', 14, 'bold');
    addSpace(3);
    for (const edu of resume.education) {
      const header = [edu.title, edu.time].filter(Boolean).join(' | ');
      addText(header, 12, 'bold');
      addSpace(2);
      for (const bullet of edu.bullets) {
        addText('• ' + bullet, 10);
      }
      addSpace();
    }
  }

  // 证书
  if (resume.certifications.length > 0) {
    addText('证书', 14, 'bold');
    addSpace(3);
    for (const cert of resume.certifications) {
      addText('• ' + cert, 10);
    }
    addSpace();
  }

  // 奖项
  if (resume.awards.length > 0) {
    addText('奖项', 14, 'bold');
    addSpace(3);
    for (const award of resume.awards) {
      addText('• ' + award, 10);
    }
    addSpace();
  }

  // 保存PDF
  const filename = `${resume.basics.name || '简历'}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

// 导出Word文档
export async function exportResumeToWord(resume: ResumeDoc): Promise<void> {
  const sections: any[] = [];

  // 基本信息
  const basicInfoParts: string[] = [];
  if (resume.basics.title) basicInfoParts.push(resume.basics.title);
  if (resume.basics.city) basicInfoParts.push(resume.basics.city);
  if (resume.basics.email) basicInfoParts.push(resume.basics.email);
  if (resume.basics.phone) basicInfoParts.push(resume.basics.phone);

  sections.push(
    new Paragraph({
      text: resume.basics.name || '候选人简历',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    })
  );

  if (basicInfoParts.length > 0) {
    sections.push(
      new Paragraph({
        text: basicInfoParts.join(' | '),
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 }
      })
    );
  }

  // 个人简介
  if (resume.summary.length > 0) {
    sections.push(
      new Paragraph({
        text: '个人简介',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      })
    );
    for (const item of resume.summary) {
      sections.push(
        new Paragraph({
          text: `• ${item}`,
          spacing: { after: 100 }
        })
      );
    }
  }

  // 技能
  if (resume.skills.length > 0) {
    sections.push(
      new Paragraph({
        text: '技能',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      })
    );
    sections.push(
      new Paragraph({
        text: resume.skills.join('、'),
        spacing: { after: 200 }
      })
    );
  }

  // 工作经历
  if (resume.experience.length > 0) {
    sections.push(
      new Paragraph({
        text: '工作经历',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      })
    );
    for (const exp of resume.experience) {
      const header = [exp.title, exp.time].filter(Boolean).join(' | ');
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: header,
              bold: true
            })
          ],
          spacing: { after: 100 }
        })
      );
      for (const bullet of exp.bullets) {
        sections.push(
          new Paragraph({
            text: `• ${bullet}`,
            spacing: { after: 100 }
          })
        );
      }
      sections.push(new Paragraph({ text: '', spacing: { after: 100 } }));
    }
  }

  // 项目经历
  if (resume.projects.length > 0) {
    sections.push(
      new Paragraph({
        text: '项目经历',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      })
    );
    for (const proj of resume.projects) {
      const header = [proj.title, proj.time].filter(Boolean).join(' | ');
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: header,
              bold: true
            })
          ],
          spacing: { after: 100 }
        })
      );
      for (const bullet of proj.bullets) {
        sections.push(
          new Paragraph({
            text: `• ${bullet}`,
            spacing: { after: 100 }
          })
        );
      }
      sections.push(new Paragraph({ text: '', spacing: { after: 100 } }));
    }
  }

  // 教育经历
  if (resume.education.length > 0) {
    sections.push(
      new Paragraph({
        text: '教育经历',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      })
    );
    for (const edu of resume.education) {
      const header = [edu.title, edu.time].filter(Boolean).join(' | ');
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: header,
              bold: true
            })
          ],
          spacing: { after: 100 }
        })
      );
      for (const bullet of edu.bullets) {
        sections.push(
          new Paragraph({
            text: `• ${bullet}`,
            spacing: { after: 100 }
          })
        );
      }
      sections.push(new Paragraph({ text: '', spacing: { after: 100 } }));
    }
  }

  // 证书
  if (resume.certifications.length > 0) {
    sections.push(
      new Paragraph({
        text: '证书',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      })
    );
    for (const cert of resume.certifications) {
      sections.push(
        new Paragraph({
          text: `• ${cert}`,
          spacing: { after: 100 }
        })
      );
    }
  }

  // 奖项
  if (resume.awards.length > 0) {
    sections.push(
      new Paragraph({
        text: '奖项',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      })
    );
    for (const award of resume.awards) {
      sections.push(
        new Paragraph({
          text: `• ${award}`,
          spacing: { after: 100 }
        })
      );
    }
  }

  // 创建文档
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections
      }
    ]
  });

  // 生成并保存Word文档
  const blob = await Packer.toBlob(doc);
  const filename = `${resume.basics.name || '简历'}_${new Date().toISOString().split('T')[0]}.docx`;
  saveAs(blob, filename);
}
