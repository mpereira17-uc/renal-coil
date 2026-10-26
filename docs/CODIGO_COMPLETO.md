# Código fuente completo · Renal / COIL 3.3

> **Nota (v3.4):** este archivo es una instantánea histórica de la versión 3.3 y ya no refleja el código vigente (rutas de `assets/` y rediseño). El código actual está en `js/`, `css/`, `data/` e `index.html`.

Fuentes de esta entrega. Para editar, usa los archivos del ZIP conservando sus carpetas. El HTML autónomo se genera con `tools/crear_portable.py`. El lockfile, documentos y recursos binarios se incluyen por separado en el ZIP.

## INICIAR_WINDOWS.bat

````bat
@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py servidor.py
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (python servidor.py) else (start "" "Abrir_sin_instalar.html")
)
````

## assets/favicon.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#146d88"/><path d="M23 7C9 5 4 23 14 31c6 5 13-1 10-7-6-1-6-7-2-10 4-2 5-6 1-7Z" fill="#ffffff"/><path d="M24 16c5 0 6 7 6 14" fill="none" stroke="#ffffff" stroke-width="2"/></svg>
````

## assets/fonts/LICENCIAS.txt

````text
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/
Upstream-Name: urw-base35-fonts
Source: https://github.com/ArtifexSoftware/urw-base35-fonts

Files: *
Copyright: 2015 URW Software
           2013, 2014 (URW)++ Design & Development
License: AGPL-3 with Font exception
 The font and related files in this directory are distributed under the
 GNU AFFERO GENERAL PUBLIC LICENSE Version 3 (see the file COPYING), with
 the following exemption:
 .
 As a special exception, permission is granted to include these font
 programs in a Postscript or PDF file that consists of a document that
 contains text to be displayed or printed using this font, regardless
 of the conditions or license applying to the document itself.

Files: appstream/*
Copyright: 2016, 2017 URW++ Design and Development GmbH
License: CC-BY-4.0

Files: debian/*
Copyright: 1997 Joost Witteveen <joost@rulcmc.leidenuniv.nl>
           1998 Marco Pistore <pistore@di.unipi.it>
           1999-2023 Roland Rosenfeld <roland@debian.org>
           2000-2001 Torsten Landschoff <torsten@debian.org>
           2001 Yasuhiro Take <take@debian.org>
           2002-2003 Peter Hawkins <peterh@debian.org>
           2004-2009 Masayuki Hatta (mhatta) <mhatta@debian.org>
           2004 Florian Weimer <fw@deneb.enyo.de>
           2005 Matthias Klose <doko@debian.org>
           2005 Steve Langasek <vorlon@debian.org>
           2006 Adeodato Simó <dato@net.com.org.es>
           2010 Kenshi Muto <kmuto@debian.org>
           2013-2022 Fabian Greffrath <fabian@debian.org>
           2016 Jakub Wilk <jwilk@debian.org>
           2017 Manuel A. Fernandez Montecelo <mafm@debian.org>
           2020 Holger Levsen <holger@debian.org>
License: GPL-2+
 This package is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.
 .
 This package is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 .
 You should have received a copy of the GNU General Public License
 along with this program. If not, see <http://www.gnu.org/licenses/>
 .
 On Debian systems, the complete text of the GNU General
 Public License version 2 can be found in "/usr/share/common-licenses/GPL-2".

License: AGPL-3
                     GNU AFFERO GENERAL PUBLIC LICENSE
                        Version 3, 19 November 2007
 .
  Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
  Everyone is permitted to copy and distribute verbatim copies
  of this license document, but changing it is not allowed.
 .
                             Preamble
 .
   The GNU Affero General Public License is a free, copyleft license for
 software and other kinds of works, specifically designed to ensure
 cooperation with the community in the case of network server software.
 .
   The licenses for most software and other practical works are designed
 to take away your freedom to share and change the works.  By contrast,
 our General Public Licenses are intended to guarantee your freedom to
 share and change all versions of a program--to make sure it remains free
 software for all its users.
 .
   When we speak of free software, we are referring to freedom, not
 price.  Our General Public Licenses are designed to make sure that you
 have the freedom to distribute copies of free software (and charge for
 them if you wish), that you receive source code or can get it if you
 want it, that you can change the software or use pieces of it in new
 free programs, and that you know you can do these things.
 .
   Developers that use our General Public Licenses protect your rights
 with two steps: (1) assert copyright on the software, and (2) offer
 you this License which gives you legal permission to copy, distribute
 and/or modify the software.
 .
   A secondary benefit of defending all users' freedom is that
 improvements made in alternate versions of the program, if they
 receive widespread use, become available for other developers to
 incorporate.  Many developers of free software are heartened and
 encouraged by the resulting cooperation.  However, in the case of
 software used on network servers, this result may fail to come about.
 The GNU General Public License permits making a modified version and
 letting the public access it on a server without ever releasing its
 source code to the public.
 .
   The GNU Affero General Public License is designed specifically to
 ensure that, in such cases, the modified source code becomes available
 to the community.  It requires the operator of a network server to
 provide the source code of the modified version running there to the
 users of that server.  Therefore, public use of a modified version, on
 a publicly accessible server, gives the public access to the source
 code of the modified version.
 .
   An older license, called the Affero General Public License and
 published by Affero, was designed to accomplish similar goals.  This is
 a different license, not a version of the Affero GPL, but Affero has
 released a new version of the Affero GPL which permits relicensing under
 this license.
 .
   The precise terms and conditions for copying, distribution and
 modification follow.
 .
                        TERMS AND CONDITIONS
 .
   0. Definitions.
 .
   "This License" refers to version 3 of the GNU Affero General Public License.
 .
   "Copyright" also means copyright-like laws that apply to other kinds of
 works, such as semiconductor masks.
 .
   "The Program" refers to any copyrightable work licensed under this
 License.  Each licensee is addressed as "you".  "Licensees" and
 "recipients" may be individuals or organizations.
 .
   To "modify" a work means to copy from or adapt all or part of the work
 in a fashion requiring copyright permission, other than the making of an
 exact copy.  The resulting work is called a "modified version" of the
 earlier work or a work "based on" the earlier work.
 .
   A "covered work" means either the unmodified Program or a work based
 on the Program.
 .
   To "propagate" a work means to do anything with it that, without
 permission, would make you directly or secondarily liable for
 infringement under applicable copyright law, except executing it on a
 computer or modifying a private copy.  Propagation includes copying,
 distribution (with or without modification), making available to the
 public, and in some countries other activities as well.
 .
   To "convey" a work means any kind of propagation that enables other
 parties to make or receive copies.  Mere interaction with a user through
 a computer network, with no transfer of a copy, is not conveying.
 .
   An interactive user interface displays "Appropriate Legal Notices"
 to the extent that it includes a convenient and prominently visible
 feature that (1) displays an appropriate copyright notice, and (2)
 tells the user that there is no warranty for the work (except to the
 extent that warranties are provided), that licensees may convey the
 work under this License, and how to view a copy of this License.  If
 the interface presents a list of user commands or options, such as a
 menu, a prominent item in the list meets this criterion.
 .
   1. Source Code.
 .
   The "source code" for a work means the preferred form of the work
 for making modifications to it.  "Object code" means any non-source
 form of a work.
 .
   A "Standard Interface" means an interface that either is an official
 standard defined by a recognized standards body, or, in the case of
 interfaces specified for a particular programming language, one that
 is widely used among developers working in that language.
 .
   The "System Libraries" of an executable work include anything, other
 than the work as a whole, that (a) is included in the normal form of
 packaging a Major Component, but which is not part of that Major
 Component, and (b) serves only to enable use of the work with that
 Major Component, or to implement a Standard Interface for which an
 implementation is available to the public in source code form.  A
 "Major Component", in this context, means a major essential component
 (kernel, window system, and so on) of the specific operating system
 (if any) on which the executable work runs, or a compiler used to
 produce the work, or an object code interpreter used to run it.
 .
   The "Corresponding Source" for a work in object code form means all
 the source code needed to generate, install, and (for an executable
 work) run the object code and to modify the work, including scripts to
 control those activities.  However, it does not include the work's
 System Libraries, or general-purpose tools or generally available free
 programs which are used unmodified in performing those activities but
 which are not part of the work.  For example, Corresponding Source
 includes interface definition files associated with source files for
 the work, and the source code for shared libraries and dynamically
 linked subprograms that the work is specifically designed to require,
 such as by intimate data communication or control flow between those
 subprograms and other parts of the work.
 .
   The Corresponding Source need not include anything that users
 can regenerate automatically from other parts of the Corresponding
 Source.
 .
   The Corresponding Source for a work in source code form is that
 same work.
 .
   2. Basic Permissions.
 .
   All rights granted under this License are granted for the term of
 copyright on the Program, and are irrevocable provided the stated
 conditions are met.  This License explicitly affirms your unlimited
 permission to run the unmodified Program.  The output from running a
 covered work is covered by this License only if the output, given its
 content, constitutes a covered work.  This License acknowledges your
 rights of fair use or other equivalent, as provided by copyright law.
 .
   You may make, run and propagate covered works that you do not
 convey, without conditions so long as your license otherwise remains
 in force.  You may convey covered works to others for the sole purpose
 of having them make modifications exclusively for you, or provide you
 with facilities for running those works, provided that you comply with
 the terms of this License in conveying all material for which you do
 not control copyright.  Those thus making or running the covered works
 for you must do so exclusively on your behalf, under your direction
 and control, on terms that prohibit them from making any copies of
 your copyrighted material outside their relationship with you.
 .
   Conveying under any other circumstances is permitted solely under
 the conditions stated below.  Sublicensing is not allowed; section 10
 makes it unnecessary.
 .
   3. Protecting Users' Legal Rights From Anti-Circumvention Law.
 .
   No covered work shall be deemed part of an effective technological
 measure under any applicable law fulfilling obligations under article
 11 of the WIPO copyright treaty adopted on 20 December 1996, or
 similar laws prohibiting or restricting circumvention of such
 measures.
 .
   When you convey a covered work, you waive any legal power to forbid
 circumvention of technological measures to the extent such circumvention
 is effected by exercising rights under this License with respect to
 the covered work, and you disclaim any intention to limit operation or
 modification of the work as a means of enforcing, against the work's
 users, your or third parties' legal rights to forbid circumvention of
 technological measures.
 .
   4. Conveying Verbatim Copies.
 .
   You may convey verbatim copies of the Program's source code as you
 receive it, in any medium, provided that you conspicuously and
 appropriately publish on each copy an appropriate copyright notice;
 keep intact all notices stating that this License and any
 non-permissive terms added in accord with section 7 apply to the code;
 keep intact all notices of the absence of any warranty; and give all
 recipients a copy of this License along with the Program.
 .
   You may charge any price or no price for each copy that you convey,
 and you may offer support or warranty protection for a fee.
 .
   5. Conveying Modified Source Versions.
 .
   You may convey a work based on the Program, or the modifications to
 produce it from the Program, in the form of source code under the
 terms of section 4, provided that you also meet all of these conditions:
 .
     a) The work must carry prominent notices stating that you modified
     it, and giving a relevant date.
 .
     b) The work must carry prominent notices stating that it is
     released under this License and any conditions added under section
     7.  This requirement modifies the requirement in section 4 to
     "keep intact all notices".
 .
     c) You must license the entire work, as a whole, under this
     License to anyone who comes into possession of a copy.  This
     License will therefore apply, along with any applicable section 7
     additional terms, to the whole of the work, and all its parts,
     regardless of how they are packaged.  This License gives no
     permission to license the work in any other way, but it does not
     invalidate such permission if you have separately received it.
 .
     d) If the work has interactive user interfaces, each must display
     Appropriate Legal Notices; however, if the Program has interactive
     interfaces that do not display Appropriate Legal Notices, your
     work need not make them do so.
 .
   A compilation of a covered work with other separate and independent
 works, which are not by their nature extensions of the covered work,
 and which are not combined with it such as to form a larger program,
 in or on a volume of a storage or distribution medium, is called an
 "aggregate" if the compilation and its resulting copyright are not
 used to limit the access or legal rights of the compilation's users
 beyond what the individual works permit.  Inclusion of a covered work
 in an aggregate does not cause this License to apply to the other
 parts of the aggregate.
 .
   6. Conveying Non-Source Forms.
 .
   You may convey a covered work in object code form under the terms
 of sections 4 and 5, provided that you also convey the
 machine-readable Corresponding Source under the terms of this License,
 in one of these ways:
 .
     a) Convey the object code in, or embodied in, a physical product
     (including a physical distribution medium), accompanied by the
     Corresponding Source fixed on a durable physical medium
     customarily used for software interchange.
 .
     b) Convey the object code in, or embodied in, a physical product
     (including a physical distribution medium), accompanied by a
     written offer, valid for at least three years and valid for as
     long as you offer spare parts or customer support for that product
     model, to give anyone who possesses the object code either (1) a
     copy of the Corresponding Source for all the software in the
     product that is covered by this License, on a durable physical
     medium customarily used for software interchange, for a price no
     more than your reasonable cost of physically performing this
     conveying of source, or (2) access to copy the
     Corresponding Source from a network server at no charge.
 .
     c) Convey individual copies of the object code with a copy of the
     written offer to provide the Corresponding Source.  This
     alternative is allowed only occasionally and noncommercially, and
     only if you received the object code with such an offer, in accord
     with subsection 6b.
 .
     d) Convey the object code by offering access from a designated
     place (gratis or for a charge), and offer equivalent access to the
     Corresponding Source in the same way through the same place at no
     further charge.  You need not require recipients to copy the
     Corresponding Source along with the object code.  If the place to
     copy the object code is a network server, the Corresponding Source
     may be on a different server (operated by you or a third party)
     that supports equivalent copying facilities, provided you maintain
     clear directions next to the object code saying where to find the
     Corresponding Source.  Regardless of what server hosts the
     Corresponding Source, you remain obligated to ensure that it is
     available for as long as needed to satisfy these requirements.
 .
     e) Convey the object code using peer-to-peer transmission, provided
     you inform other peers where the object code and Corresponding
     Source of the work are being offered to the general public at no
     charge under subsection 6d.
 .
   A separable portion of the object code, whose source code is excluded
 from the Corresponding Source as a System Library, need not be
 included in conveying the object code work.
 .
   A "User Product" is either (1) a "consumer product", which means any
 tangible personal property which is normally used for personal, family,
 or household purposes, or (2) anything designed or sold for incorporation
 into a dwelling.  In determining whether a product is a consumer product,
 doubtful cases shall be resolved in favor of coverage.  For a particular
 product received by a particular user, "normally used" refers to a
 typical or common use of that class of product, regardless of the status
 of the particular user or of the way in which the particular user
 actually uses, or expects or is expected to use, the product.  A product
 is a consumer product regardless of whether the product has substantial
 commercial, industrial or non-consumer uses, unless such uses represent
 the only significant mode of use of the product.
 .
   "Installation Information" for a User Product means any methods,
 procedures, authorization keys, or other information required to install
 and execute modified versions of a covered work in that User Product from
 a modified version of its Corresponding Source.  The information must
 suffice to ensure that the continued functioning of the modified object
 code is in no case prevented or interfered with solely because
 modification has been made.
 .
   If you convey an object code work under this section in, or with, or
 specifically for use in, a User Product, and the conveying occurs as
 part of a transaction in which the right of possession and use of the
 User Product is transferred to the recipient in perpetuity or for a
 fixed term (regardless of how the transaction is characterized), the
 Corresponding Source conveyed under this section must be accompanied
 by the Installation Information.  But this requirement does not apply
 if neither you nor any third party retains the ability to install
 modified object code on the User Product (for example, the work has
 been installed in ROM).
 .
   The requirement to provide Installation Information does not include a
 requirement to continue to provide support service, warranty, or updates
 for a work that has been modified or installed by the recipient, or for
 the User Product in which it has been modified or installed.  Access to a
 network may be denied when the modification itself materially and
 adversely affects the operation of the network or violates the rules and
 protocols for communication across the network.
 .
   Corresponding Source conveyed, and Installation Information provided,
 in accord with this section must be in a format that is publicly
 documented (and with an implementation available to the public in
 source code form), and must require no special password or key for
 unpacking, reading or copying.
 .
   7. Additional Terms.
 .
   "Additional permissions" are terms that supplement the terms of this
 License by making exceptions from one or more of its conditions.
 Additional permissions that are applicable to the entire Program shall
 be treated as though they were included in this License, to the extent
 that they are valid under applicable law.  If additional permissions
 apply only to part of the Program, that part may be used separately
 under those permissions, but the entire Program remains governed by
 this License without regard to the additional permissions.
 .
   When you convey a copy of a covered work, you may at your option
 remove any additional permissions from that copy, or from any part of
 it.  (Additional permissions may be written to require their own
 removal in certain cases when you modify the work.)  You may place
 additional permissions on material, added by you to a covered work,
 for which you have or can give appropriate copyright permission.
 .
   Notwithstanding any other provision of this License, for material you
 add to a covered work, you may (if authorized by the copyright holders of
 that material) supplement the terms of this License with terms:
 .
     a) Disclaiming warranty or limiting liability differently from the
     terms of sections 15 and 16 of this License; or
 .
     b) Requiring preservation of specified reasonable legal notices or
     author attributions in that material or in the Appropriate Legal
     Notices displayed by works containing it; or
 .
     c) Prohibiting misrepresentation of the origin of that material, or
     requiring that modified versions of such material be marked in
     reasonable ways as different from the original version; or
 .
     d) Limiting the use for publicity purposes of names of licensors or
     authors of the material; or
 .
     e) Declining to grant rights under trademark law for use of some
     trade names, trademarks, or service marks; or
 .
     f) Requiring indemnification of licensors and authors of that
     material by anyone who conveys the material (or modified versions of
     it) with contractual assumptions of liability to the recipient, for
     any liability that these contractual assumptions directly impose on
     those licensors and authors.
 .
   All other non-permissive additional terms are considered "further
 restrictions" within the meaning of section 10.  If the Program as you
 received it, or any part of it, contains a notice stating that it is
 governed by this License along with a term that is a further
 restriction, you may remove that term.  If a license document contains
 a further restriction but permits relicensing or conveying under this
 License, you may add to a covered work material governed by the terms
 of that license document, provided that the further restriction does
 not survive such relicensing or conveying.
 .
   If you add terms to a covered work in accord with this section, you
 must place, in the relevant source files, a statement of the
 additional terms that apply to those files, or a notice indicating
 where to find the applicable terms.
 .
   Additional terms, permissive or non-permissive, may be stated in the
 form of a separately written license, or stated as exceptions;
 the above requirements apply either way.
 .
   8. Termination.
 .
   You may not propagate or modify a covered work except as expressly
 provided under this License.  Any attempt otherwise to propagate or
 modify it is void, and will automatically terminate your rights under
 this License (including any patent licenses granted under the third
 paragraph of section 11).
 .
   However, if you cease all violation of this License, then your
 license from a particular copyright holder is reinstated (a)
 provisionally, unless and until the copyright holder explicitly and
 finally terminates your license, and (b) permanently, if the copyright
 holder fails to notify you of the violation by some reasonable means
 prior to 60 days after the cessation.
 .
   Moreover, your license from a particular copyright holder is
 reinstated permanently if the copyright holder notifies you of the
 violation by some reasonable means, this is the first time you have
 received notice of violation of this License (for any work) from that
 copyright holder, and you cure the violation prior to 30 days after
 your receipt of the notice.
 .
   Termination of your rights under this section does not terminate the
 licenses of parties who have received copies or rights from you under
 this License.  If your rights have been terminated and not permanently
 reinstated, you do not qualify to receive new licenses for the same
 material under section 10.
 .
   9. Acceptance Not Required for Having Copies.
 .
   You are not required to accept this License in order to receive or
 run a copy of the Program.  Ancillary propagation of a covered work
 occurring solely as a consequence of using peer-to-peer transmission
 to receive a copy likewise does not require acceptance.  However,
 nothing other than this License grants you permission to propagate or
 modify any covered work.  These actions infringe copyright if you do
 not accept this License.  Therefore, by modifying or propagating a
 covered work, you indicate your acceptance of this License to do so.
 .
   10. Automatic Licensing of Downstream Recipients.
 .
   Each time you convey a covered work, the recipient automatically
 receives a license from the original licensors, to run, modify and
 propagate that work, subject to this License.  You are not responsible
 for enforcing compliance by third parties with this License.
 .
   An "entity transaction" is a transaction transferring control of an
 organization, or substantially all assets of one, or subdividing an
 organization, or merging organizations.  If propagation of a covered
 work results from an entity transaction, each party to that
 transaction who receives a copy of the work also receives whatever
 licenses to the work the party's predecessor in interest had or could
 give under the previous paragraph, plus a right to possession of the
 Corresponding Source of the work from the predecessor in interest, if
 the predecessor has it or can get it with reasonable efforts.
 .
   You may not impose any further restrictions on the exercise of the
 rights granted or affirmed under this License.  For example, you may
 not impose a license fee, royalty, or other charge for exercise of
 rights granted under this License, and you may not initiate litigation
 (including a cross-claim or counterclaim in a lawsuit) alleging that
 any patent claim is infringed by making, using, selling, offering for
 sale, or importing the Program or any portion of it.
 .
   11. Patents.
 .
   A "contributor" is a copyright holder who authorizes use under this
 License of the Program or a work on which the Program is based.  The
 work thus licensed is called the contributor's "contributor version".
 .
   A contributor's "essential patent claims" are all patent claims
 owned or controlled by the contributor, whether already acquired or
 hereafter acquired, that would be infringed by some manner, permitted
 by this License, of making, using, or selling its contributor version,
 but do not include claims that would be infringed only as a
 consequence of further modification of the contributor version.  For
 purposes of this definition, "control" includes the right to grant
 patent sublicenses in a manner consistent with the requirements of
 this License.
 .
   Each contributor grants you a non-exclusive, worldwide, royalty-free
 patent license under the contributor's essential patent claims, to
 make, use, sell, offer for sale, import and otherwise run, modify and
 propagate the contents of its contributor version.
 .
   In the following three paragraphs, a "patent license" is any express
 agreement or commitment, however denominated, not to enforce a patent
 (such as an express permission to practice a patent or covenant not to
 sue for patent infringement).  To "grant" such a patent license to a
 party means to make such an agreement or commitment not to enforce a
 patent against the party.
 .
   If you convey a covered work, knowingly relying on a patent license,
 and the Corresponding Source of the work is not available for anyone
 to copy, free of charge and under the terms of this License, through a
 publicly available network server or other readily accessible means,
 then you must either (1) cause the Corresponding Source to be so
 available, or (2) arrange to deprive yourself of the benefit of the
 patent license for this particular work, or (3) arrange, in a manner
 consistent with the requirements of this License, to extend the patent
 license to downstream recipients.  "Knowingly relying" means you have
 actual knowledge that, but for the patent license, your conveying the
 covered work in a country, or your recipient's use of the covered work
 in a country, would infringe one or more identifiable patents in that
 country that you have reason to believe are valid.
 .
   If, pursuant to or in connection with a single transaction or
 arrangement, you convey, or propagate by procuring conveyance of, a
 covered work, and grant a patent license to some of the parties
 receiving the covered work authorizing them to use, propagate, modify
 or convey a specific copy of the covered work, then the patent license
 you grant is automatically extended to all recipients of the covered
 work and works based on it.
 .
   A patent license is "discriminatory" if it does not include within
 the scope of its coverage, prohibits the exercise of, or is
 conditioned on the non-exercise of one or more of the rights that are
 specifically granted under this License.  You may not convey a covered
 work if you are a party to an arrangement with a third party that is
 in the business of distributing software, under which you make payment
 to the third party based on the extent of your activity of conveying
 the work, and under which the third party grants, to any of the
 parties who would receive the covered work from you, a discriminatory
 patent license (a) in connection with copies of the covered work
 conveyed by you (or copies made from those copies), or (b) primarily
 for and in connection with specific products or compilations that
 contain the covered work, unless you entered into that arrangement,
 or that patent license was granted, prior to 28 March 2007.
 .
   Nothing in this License shall be construed as excluding or limiting
 any implied license or other defenses to infringement that may
 otherwise be available to you under applicable patent law.
 .
   12. No Surrender of Others' Freedom.
 .
   If conditions are imposed on you (whether by court order, agreement or
 otherwise) that contradict the conditions of this License, they do not
 excuse you from the conditions of this License.  If you cannot convey a
 covered work so as to satisfy simultaneously your obligations under this
 License and any other pertinent obligations, then as a consequence you may
 not convey it at all.  For example, if you agree to terms that obligate you
 to collect a royalty for further conveying from those to whom you convey
 the Program, the only way you could satisfy both those terms and this
 License would be to refrain entirely from conveying the Program.
 .
   13. Remote Network Interaction; Use with the GNU General Public License.
 .
   Notwithstanding any other provision of this License, if you modify the
 Program, your modified version must prominently offer all users
 interacting with it remotely through a computer network (if your version
 supports such interaction) an opportunity to receive the Corresponding
 Source of your version by providing access to the Corresponding Source
 from a network server at no charge, through some standard or customary
 means of facilitating copying of software.  This Corresponding Source
 shall include the Corresponding Source for any work covered by version 3
 of the GNU General Public License that is incorporated pursuant to the
 following paragraph.
 .
   Notwithstanding any other provision of this License, you have
 permission to link or combine any covered work with a work licensed
 under version 3 of the GNU General Public License into a single
 combined work, and to convey the resulting work.  The terms of this
 License will continue to apply to the part which is the covered work,
 but the work with which it is combined will remain governed by version
 3 of the GNU General Public License.
 .
   14. Revised Versions of this License.
 .
   The Free Software Foundation may publish revised and/or new versions of
 the GNU Affero General Public License from time to time.  Such new versions
 will be similar in spirit to the present version, but may differ in detail to
 address new problems or concerns.
 .
   Each version is given a distinguishing version number.  If the
 Program specifies that a certain numbered version of the GNU Affero General
 Public License "or any later version" applies to it, you have the
 option of following the terms and conditions either of that numbered
 version or of any later version published by the Free Software
 Foundation.  If the Program does not specify a version number of the
 GNU Affero General Public License, you may choose any version ever published
 by the Free Software Foundation.
 .
   If the Program specifies that a proxy can decide which future
 versions of the GNU Affero General Public License can be used, that proxy's
 public statement of acceptance of a version permanently authorizes you
 to choose that version for the Program.
 .
   Later license versions may give you additional or different
 permissions.  However, no additional obligations are imposed on any
 author or copyright holder as a result of your choosing to follow a
 later version.
 .
   15. Disclaimer of Warranty.
 .
   THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
 APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
 HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
 THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
 IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
 ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
 .
   16. Limitation of Liability.
 .
   IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
 WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
 THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
 GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
 USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
 DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
 PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
 EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
 SUCH DAMAGES.
 .
   17. Interpretation of Sections 15 and 16.
 .
   If the disclaimer of warranty and limitation of liability provided
 above cannot be given local legal effect according to their terms,
 reviewing courts shall apply local law that most closely approximates
 an absolute waiver of all civil liability in connection with the
 Program, unless a warranty or assumption of liability accompanies a
 copy of the Program in return for a fee.
 .
                      END OF TERMS AND CONDITIONS
 .
             How to Apply These Terms to Your New Programs
 .
   If you develop a new program, and you want it to be of the greatest
 possible use to the public, the best way to achieve this is to make it
 free software which everyone can redistribute and change under these terms.
 .
   To do so, attach the following notices to the program.  It is safest
 to attach them to the start of each source file to most effectively
 state the exclusion of warranty; and each file should have at least
 the "copyright" line and a pointer to where the full notice is found.
 .
     <one line to give the program's name and a brief idea of what it does.>
     Copyright (C) <year>  <name of author>
 .
     This program is free software: you can redistribute it and/or modify
     it under the terms of the GNU Affero General Public License as published by
     the Free Software Foundation, either version 3 of the License, or
     (at your option) any later version.
 .
     This program is distributed in the hope that it will be useful,
     but WITHOUT ANY WARRANTY; without even the implied warranty of
     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     GNU Affero General Public License for more details.
 .
     You should have received a copy of the GNU Affero General Public License
     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 .
 Also add information on how to contact you by electronic and paper mail.
 .
   If your software can interact with users remotely through a computer
 network, you should also make sure that it provides a way for users to
 get its source.  For example, if your program is a web application, its
 interface could display a "Source" link that leads users to an archive
 of the code.  There are many ways you could offer source, and different
 solutions will be better for different programs; see section 13 for the
 specific requirements.
 .
   You should also get your employer (if you work as a programmer) or school,
 if any, to sign a "copyright disclaimer" for the program, if necessary.
 For more information on this, and how to apply and follow the GNU AGPL, see
 <http://www.gnu.org/licenses/>.

License: CC-BY-4.0
 Creative Commons Attribution 4.0 International Public License
 .
 By exercising the Licensed Rights (defined below), You accept and agree
 to be bound by the terms and conditions of this Creative Commons
 Attribution 4.0 International Public License ("Public License"). To the
 extent this Public License may be interpreted as a contract, You are
 granted the Licensed Rights in consideration of Your acceptance of
 these terms and conditions, and the Licensor grants You such rights in
 consideration of benefits the Licensor receives from making the
 Licensed Material available under these terms and conditions.
 .
 Section 1 -- Definitions.
 .
  a. Adapted Material means material subject to Copyright and Similar
     Rights that is derived from or based upon the Licensed Material
     and in which the Licensed Material is translated, altered,
     arranged, transformed, or otherwise modified in a manner requiring
     permission under the Copyright and Similar Rights held by the
     Licensor. For purposes of this Public License, where the Licensed
     Material is a musical work, performance, or sound recording,
     Adapted Material is always produced where the Licensed Material is
     synched in timed relation with a moving image.
 .
  b. Adapter's License means the license You apply to Your Copyright
     and Similar Rights in Your contributions to Adapted Material in
     accordance with the terms and conditions of this Public License.
 .
  c. Copyright and Similar Rights means copyright and/or similar rights
     closely related to copyright including, without limitation,
     performance, broadcast, sound recording, and Sui Generis Database
     Rights, without regard to how the rights are labeled or
     categorized. For purposes of this Public License, the rights
     specified in Section 2(b)(1)-(2) are not Copyright and Similar
     Rights.
 .
  d. Effective Technological Measures means those measures that, in the
     absence of proper authority, may not be circumvented under laws
     fulfilling obligations under Article 11 of the WIPO Copyright
     Treaty adopted on December 20, 1996, and/or similar international
     agreements.
 .
  e. Exceptions and Limitations means fair use, fair dealing, and/or
     any other exception or limitation to Copyright and Similar Rights
     that applies to Your use of the Licensed Material.
 .
  f. Licensed Material means the artistic or literary work, database,
     or other material to which the Licensor applied this Public
     License.
 .
  g. Licensed Rights means the rights granted to You subject to the
     terms and conditions of this Public License, which are limited to
     all Copyright and Similar Rights that apply to Your use of the
     Licensed Material and that the Licensor has authority to license.
 .
  h. Licensor means the individual(s) or entity(ies) granting rights
     under this Public License.
 .
  i. Share means to provide material to the public by any means or
     process that requires permission under the Licensed Rights, such
     as reproduction, public display, public performance, distribution,
     dissemination, communication, or importation, and to make material
     available to the public including in ways that members of the
     public may access the material from a place and at a time
     individually chosen by them.
 .
  j. Sui Generis Database Rights means rights other than copyright
     resulting from Directive 96/9/EC of the European Parliament and of
     the Council of 11 March 1996 on the legal protection of databases,
     as amended and/or succeeded, as well as other essentially
     equivalent rights anywhere in the world.
 .
  k. You means the individual or entity exercising the Licensed Rights
     under this Public License. Your has a corresponding meaning.
 .
 Section 2 -- Scope.
 .
  a. License grant.
 .
       1. Subject to the terms and conditions of this Public License,
          the Licensor hereby grants You a worldwide, royalty-free,
          non-sublicensable, non-exclusive, irrevocable license to
          exercise the Licensed Rights in the Licensed Material to:
 .
            a. reproduce and Share the Licensed Material, in whole or
               in part; and
 .
            b. produce, reproduce, and Share Adapted Material.
 .
       2. Exceptions and Limitations. For the avoidance of doubt, where
          Exceptions and Limitations apply to Your use, this Public
          License does not apply, and You do not need to comply with
          its terms and conditions.
 .
       3. Term. The term of this Public License is specified in Section
          6(a).
 .
       4. Media and formats; technical modifications allowed. The
          Licensor authorizes You to exercise the Licensed Rights in
          all media and formats whether now known or hereafter created,
          and to make technical modifications necessary to do so. The
          Licensor waives and/or agrees not to assert any right or
          authority to forbid You from making technical modifications
          necessary to exercise the Licensed Rights, including
          technical modifications necessary to circumvent Effective
          Technological Measures. For purposes of this Public License,
          simply making modifications authorized by this Section 2(a)
          (4) never produces Adapted Material.
 .
       5. Downstream recipients.
 .
            a. Offer from the Licensor -- Licensed Material. Every
               recipient of the Licensed Material automatically
               receives an offer from the Licensor to exercise the
               Licensed Rights under the terms and conditions of this
               Public License.
 .
            b. No downstream restrictions. You may not offer or impose
               any additional or different terms or conditions on, or
               apply any Effective Technological Measures to, the
               Licensed Material if doing so restricts exercise of the
               Licensed Rights by any recipient of the Licensed
               Material.
 .
       6. No endorsement. Nothing in this Public License constitutes or
          may be construed as permission to assert or imply that You
          are, or that Your use of the Licensed Material is, connected
          with, or sponsored, endorsed, or granted official status by,
          the Licensor or others designated to receive attribution as
          provided in Section 3(a)(1)(A)(i).
 .
  b. Other rights.
 .
       1. Moral rights, such as the right of integrity, are not
          licensed under this Public License, nor are publicity,
          privacy, and/or other similar personality rights; however, to
          the extent possible, the Licensor waives and/or agrees not to
          assert any such rights held by the Licensor to the limited
          extent necessary to allow You to exercise the Licensed
          Rights, but not otherwise.
 .
       2. Patent and trademark rights are not licensed under this
          Public License.
 .
       3. To the extent possible, the Licensor waives any right to
          collect royalties from You for the exercise of the Licensed
          Rights, whether directly or through a collecting society
          under any voluntary or waivable statutory or compulsory
          licensing scheme. In all other cases the Licensor expressly
          reserves any right to collect such royalties.
 .
 Section 3 -- License Conditions.
 .
 Your exercise of the Licensed Rights is expressly made subject to the
 following conditions.
 .
  a. Attribution.
 .
       1. If You Share the Licensed Material (including in modified
          form), You must:
 .
            a. retain the following if it is supplied by the Licensor
               with the Licensed Material:
 .
                 i. identification of the creator(s) of the Licensed
                    Material and any others designated to receive
                    attribution, in any reasonable manner requested by
                    the Licensor (including by pseudonym if
                    designated);
 .
                ii. a copyright notice;
 .
               iii. a notice that refers to this Public License;
 .
                iv. a notice that refers to the disclaimer of
                    warranties;
 .
                 v. a URI or hyperlink to the Licensed Material to the
                    extent reasonably practicable;
 .
            b. indicate if You modified the Licensed Material and
               retain an indication of any previous modifications; and
 .
            c. indicate the Licensed Material is licensed under this
               Public License, and include the text of, or the URI or
               hyperlink to, this Public License.
 .
       2. You may satisfy the conditions in Section 3(a)(1) in any
          reasonable manner based on the medium, means, and context in
          which You Share the Licensed Material. For example, it may be
          reasonable to satisfy the conditions by providing a URI or
          hyperlink to a resource that includes the required
          information.
 .
       3. If requested by the Licensor, You must remove any of the
          information required by Section 3(a)(1)(A) to the extent
          reasonably practicable.
 .
       4. If You Share Adapted Material You produce, the Adapter's
          License You apply must not prevent recipients of the Adapted
          Material from complying with this Public License.
 .
 Section 4 -- Sui Generis Database Rights.
 .
 Where the Licensed Rights include Sui Generis Database Rights that
 apply to Your use of the Licensed Material:
 .
  a. for the avoidance of doubt, Section 2(a)(1) grants You the right
     to extract, reuse, reproduce, and Share all or a substantial
     portion of the contents of the database;
 .
  b. if You include all or a substantial portion of the database
     contents in a database in which You have Sui Generis Database
     Rights, then the database in which You have Sui Generis Database
     Rights (but not its individual contents) is Adapted Material; and
 .
  c. You must comply with the conditions in Section 3(a) if You Share
     all or a substantial portion of the contents of the database.
 .
 For the avoidance of doubt, this Section 4 supplements and does not
 replace Your obligations under this Public License where the Licensed
 Rights include other Copyright and Similar Rights.
 .
 Section 5 -- Disclaimer of Warranties and Limitation of Liability.
 .
  a. UNLESS OTHERWISE SEPARATELY UNDERTAKEN BY THE LICENSOR, TO THE
     EXTENT POSSIBLE, THE LICENSOR OFFERS THE LICENSED MATERIAL AS-IS
     AND AS-AVAILABLE, AND MAKES NO REPRESENTATIONS OR WARRANTIES OF
     ANY KIND CONCERNING THE LICENSED MATERIAL, WHETHER EXPRESS,
     IMPLIED, STATUTORY, OR OTHER. THIS INCLUDES, WITHOUT LIMITATION,
     WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR
     PURPOSE, NON-INFRINGEMENT, ABSENCE OF LATENT OR OTHER DEFECTS,
     ACCURACY, OR THE PRESENCE OR ABSENCE OF ERRORS, WHETHER OR NOT
     KNOWN OR DISCOVERABLE. WHERE DISCLAIMERS OF WARRANTIES ARE NOT
     ALLOWED IN FULL OR IN PART, THIS DISCLAIMER MAY NOT APPLY TO YOU.
 .
  b. TO THE EXTENT POSSIBLE, IN NO EVENT WILL THE LICENSOR BE LIABLE
     TO YOU ON ANY LEGAL THEORY (INCLUDING, WITHOUT LIMITATION,
     NEGLIGENCE) OR OTHERWISE FOR ANY DIRECT, SPECIAL, INDIRECT,
     INCIDENTAL, CONSEQUENTIAL, PUNITIVE, EXEMPLARY, OR OTHER LOSSES,
     COSTS, EXPENSES, OR DAMAGES ARISING OUT OF THIS PUBLIC LICENSE OR
     USE OF THE LICENSED MATERIAL, EVEN IF THE LICENSOR HAS BEEN
     ADVISED OF THE POSSIBILITY OF SUCH LOSSES, COSTS, EXPENSES, OR
     DAMAGES. WHERE A LIMITATION OF LIABILITY IS NOT ALLOWED IN FULL OR
     IN PART, THIS LIMITATION MAY NOT APPLY TO YOU.
 .
  c. The disclaimer of warranties and limitation of liability provided
     above shall be interpreted in a manner that, to the extent
     possible, most closely approximates an absolute disclaimer and
     waiver of all liability.
 .
 Section 6 -- Term and Termination.
 .
  a. This Public License applies for the term of the Copyright and
     Similar Rights licensed here. However, if You fail to comply with
     this Public License, then Your rights under this Public License
     terminate automatically.
 .
  b. Where Your right to use the Licensed Material has terminated under
     Section 6(a), it reinstates:
 .
       1. automatically as of the date the violation is cured, provided
          it is cured within 30 days of Your discovery of the
          violation; or
 .
       2. upon express reinstatement by the Licensor.
 .
     For the avoidance of doubt, this Section 6(b) does not affect any
     right the Licensor may have to seek remedies for Your violations
     of this Public License.
 .
  c. For the avoidance of doubt, the Licensor may also offer the
     Licensed Material under separate terms or conditions or stop
     distributing the Licensed Material at any time; however, doing so
     will not terminate this Public License.
 .
  d. Sections 1, 5, 6, 7, and 8 survive termination of this Public
     License.
 .
 Section 7 -- Other Terms and Conditions.
 .
  a. The Licensor shall not be bound by any additional or different
     terms or conditions communicated by You unless expressly agreed.
 .
  b. Any arrangements, understandings, or agreements regarding the
     Licensed Material not stated herein are separate from and
     independent of the terms and conditions of this Public License.
 .
 Section 8 -- Interpretation.
 .
  a. For the avoidance of doubt, this Public License does not, and
     shall not be interpreted to, reduce, limit, restrict, or impose
     conditions on any use of the Licensed Material that could lawfully
     be made without permission under this Public License.
 .
  b. To the extent possible, if any provision of this Public License is
     deemed unenforceable, it shall be automatically reformed to the
     minimum extent necessary to make it enforceable. If the provision
     cannot be reformed, it shall be severed from this Public License
     without affecting the enforceability of the remaining terms and
     conditions.
 .
  c. No term or condition of this Public License will be waived and no
     failure to comply consented to unless expressly agreed to by the
     Licensor.
 .
  d. Nothing in this Public License constitutes or may be interpreted
     as a limitation upon, or waiver of, any privileges and immunities
     that apply to the Licensor or You, including from the legal
     processes of any jurisdiction or authority.
````

## assets/kidney.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 370" role="group" aria-labelledby="kidney-title kidney-desc">
  <title id="kidney-title" data-i18n="kidneyTitle">Riñón: esquema interactivo</title><desc id="kidney-desc" data-i18n="kidneyDescription">Corte esquemático de un riñón. Cinco puntos permiten explorar corteza, médula, glomérulo, uréter y arteria.</desc>
  <!-- Corte anatómico simplificado para educación; no imagen clínica. -->
  <ellipse cx="232" cy="344" rx="127" ry="9" fill="#cdd6c4" opacity=".55"/>
  <path class="kidney-outline" d="M224 31C140 18 84 73 79 169c-5 95 49 164 120 160 57-3 84-41 69-72-8-18-45-25-43-70 1-36 34-46 44-62 22-34 4-87-45-94Z"/>
  <path d="M218 48C150 37 101 85 96 167c-5 83 44 146 102 144 41-2 63-30 55-49-9-21-43-39-43-77 0-44 31-54 42-68 20-29 1-63-34-69Z" fill="#f0cbb0" stroke="#bc795f" stroke-width="1.2"/>
  <path class="medulla-region" d="M191 68c-30 4-49 14-57 24l70 45-13-69Z"/>
  <path class="medulla-region" d="M116 120c-10 19-13 40-11 57l89-4-78-53Z"/>
  <path class="medulla-region" d="M106 204c4 25 14 45 26 56l67-58-93 2Z"/>
  <path class="medulla-region" d="M155 285c16 15 43 18 63 10l-18-79-45 69Z"/>
  <path d="M205 139c9 15 6 24 6 36 0 14-2 26-9 36 25-6 30 7 37 18 12-12 18-27 15-43-4-13-15-22-15-32 0-9 7-18 14-24-19 3-33 10-48 9Z" fill="#e1c390" stroke="#b39964" stroke-width="1.5"/>
  <path d="M241 210c20 28 25 49 25 116" fill="none" stroke="#bba062" stroke-width="16" stroke-linecap="round"/>
  <path d="M241 210c20 28 25 49 25 116" fill="none" stroke="#eddaaa" stroke-width="11" stroke-linecap="round"/>
  <path d="M241 156c27-9 38-10 90-10" fill="none" stroke="#914f40" stroke-width="17" stroke-linecap="round"/>
  <path d="M241 156c27-9 38-10 90-10" fill="none" stroke="#c87363" stroke-width="12" stroke-linecap="round"/>
  <path d="M239 174c29 6 43 4 94 4" fill="none" stroke="#416f82" stroke-width="13" stroke-linecap="round"/>
  <path d="M239 174c29 6 43 4 94 4" fill="none" stroke="#80a4af" stroke-width="9" stroke-linecap="round"/>
  <path class="kidney-detail-line" d="M237 154c-18-2-23-13-32-22M220 149l-28-32m37 40-37 6m32 15-33 25m32-15-28 44"/>
  <path class="kidney-detail-line" d="m185 110-3-15m1 6-9-5m14 16-10 5m-30 37-12-8m12 8-11 7m17 75-12 8m12-8 5 10m42 42-2 11"/>
  <circle cx="127" cy="103" r="14" fill="#f9e7d3" stroke="#b97359" stroke-width="1.5"/>
  <path d="M120 107c-8-10 10-21 10-5-9 12-14-10-2-9 10 2-9 21-11 10" fill="none" stroke="#b15e4e" stroke-width="2"/>
  <circle r="3.5" fill="#fbe6ce"><animateMotion dur="3s" repeatCount="indefinite" path="M331 146C285 146 254 150 224 157"/></circle>
  <circle r="3" fill="#e6f2ed"><animateMotion dur="3.5s" repeatCount="indefinite" path="M239 174C273 180 304 178 333 178"/></circle>
  <circle r="3" fill="#fff4d0"><animateMotion dur="4s" repeatCount="indefinite" path="M241 210C262 241 266 268 266 326"/></circle>
  <path class="kidney-label-line" d="M177 47 177 22 133 22M296 146l34-27h73M282 277h80"/>
  <text x="58" y="25" class="kidney-label" data-i18n="filterMembrane">Barrera de filtrado</text>
  <text x="335" y="113" class="kidney-label" data-i18n="filterBlood">Sangre que llega</text>
  <text x="306" y="300" class="kidney-label" data-i18n="filterUrine">Hacia la orina</text>
  <g class="kidney-hotspot" data-part="corteza" tabindex="0" role="button" aria-pressed="true" aria-label="Corteza renal" transform="translate(99 177)"><circle class="hotspot-hit" r="25" fill="transparent"/><circle class="hotspot-halo" r="13"/><circle class="hotspot-center" r="4"/></g>
  <g class="kidney-hotspot" data-part="medula" tabindex="0" role="button" aria-pressed="false" aria-label="Médula renal" transform="translate(151 220)"><circle class="hotspot-hit" r="25" fill="transparent"/><circle class="hotspot-halo" r="13"/><circle class="hotspot-center" r="4"/></g>
  <g class="kidney-hotspot" data-part="glomerulo" tabindex="0" role="button" aria-pressed="false" aria-label="Glomérulo" transform="translate(126 104)"><circle class="hotspot-hit" r="25" fill="transparent"/><circle class="hotspot-halo" r="13"/><circle class="hotspot-center" r="4"/></g>
  <g class="kidney-hotspot" data-part="ureter" tabindex="0" role="button" aria-pressed="false" aria-label="Uréter" transform="translate(265 292)"><circle class="hotspot-hit" r="25" fill="transparent"/><circle class="hotspot-halo" r="13"/><circle class="hotspot-center" r="4"/></g>
  <g class="kidney-hotspot" data-part="arteria" tabindex="0" role="button" aria-pressed="false" aria-label="Arteria renal" transform="translate(296 146)"><circle class="hotspot-hit" r="25" fill="transparent"/><circle class="hotspot-halo" r="13"/><circle class="hotspot-center" r="4"/></g>
</svg>
````

## css/base.css

````css
@layer foundation, layout, components, extensions;
@layer foundation {
*,*::before,*::after{
  box-sizing:border-box
}
html{
  scroll-behavior:smooth;
  scroll-padding-top:7rem
}
body{
  margin:0;
  background:var(--paper);
  color:var(--text);
  font:1rem/1.55 var(--sans);
  -webkit-font-smoothing:antialiased
}
button,input,select{
  font:inherit
}
button,a,input,select{
  -webkit-tap-highlight-color:transparent
}
button{
  cursor:pointer
}
button{
  color:inherit
}
a{
  color:inherit;
  text-decoration:none
}
button:disabled{
  cursor:default;
  opacity:.4
}
button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,[tabindex]:focus-visible{
  outline:3px solid var(--blue);
  outline-offset:4px
}
button,input,select{
  border-radius:.35rem
}
input,select{
  max-width:100%;
  background:var(--surface);
  border:1px solid #98a597;
  color:var(--ink);
  padding:.65rem .75rem
}
input[type=checkbox]{
  accent-color:var(--ink);
  width:1.1rem;
  height:1.1rem;
  flex-shrink:0
}
input[type=range]{
  accent-color:var(--ink);
  width:100%;
  padding:0;
  min-height:44px
}
input:invalid:not(:placeholder-shown){
  box-shadow:none
}
img,svg{
  max-width:100%
}
h1,h2,h3,p{
  margin:0
}
h1,h2,h3{
  color:var(--ink)
}
h1,h2{
  font-family:var(--serif);
  font-weight:400;
  line-height:1.12;
  letter-spacing:-.035em
}
h1{
  font-size:clamp(2.8rem,5vw,4.8rem)
}
h2{
  font-size:clamp(2rem,3vw,2.85rem)
}
h3{
  font-size:1.2rem;
  line-height:1.3
}
p{
  max-width:70ch
}
em{
  font-family:var(--serif);
  font-weight:400
}
ul{
  padding-left:1.2rem;
  margin:1rem 0
}
li+li{
  margin-top:.5rem
}
small{
  font-size:.875rem
}
strong{
  font-weight:700
}
[hidden]{
  display:none!important
}
::selection{
  background:var(--sage);
  color:var(--ink)
}
.fine-print,.medical-source{
  font-size:.875rem;
  line-height:1.55;
  color:var(--muted)
}
.eyebrow,.small-label{
  font-size:.875rem;
  color:var(--muted)
}
.eyebrow{
  font-weight:700;
  letter-spacing:.1em;
  margin-bottom:1rem
}
.small-label{
  letter-spacing:.055em
}
.tag{
  display:inline-flex;
  align-items:center;
  padding:.35rem .65rem;
  border:1px solid var(--line);
  border-radius:3px;
  font-size:.875rem;
  line-height:1.4
}
.text-link{
  background:none;
  border:0;
  border-radius:0;
  padding:.2rem 0;
  color:var(--ink);
  text-decoration:underline;
  text-decoration-color:#92a49a;
  text-underline-offset:5px;
  font-size:1rem;
  min-height:36px;
  display:inline-flex;
  align-items:center
}
.text-link:hover{
  text-decoration-color:var(--ink)
}
.button{
  display:inline-flex;
  justify-content:center;
  align-items:center;
  gap:.5rem;
  padding:.85rem 1.25rem;
  min-height:48px;
  border:1px solid transparent;
  line-height:1.25;
  font-size:1rem;
  border-radius:5px;
  transition:background .18s,transform .18s
}
.button:hover{
  transform:translateY(-2px)
}
.button.primary{
  background:var(--ink);
  color:var(--paper)
}
.button.primary:hover{
  background:#245448
}
.button.secondary{
  background:transparent;
  border-color:#92a497;
  color:var(--ink)
}
.button.secondary:hover{
  background:var(--studio)
}
.button.danger{
  background:var(--danger);
  color:var(--paper)
}
.danger-text{
  color:var(--danger)
}
.icon-button{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:44px;
  height:44px;
  background:transparent;
  border:0;
  font-size:1.8rem;
  line-height:1;
  border-radius:5px;
  flex-shrink:0
}
.icon-button:hover{
  background:var(--sage)
}
.skip-link{
  position:fixed;
  left:1rem;
  top:-5rem;
  z-index:99;
  padding:1rem;
  background:var(--ink);
  color:var(--paper)
}
.skip-link:focus{
  top:1rem
}
.notice{
  display:flex;
  align-items:flex-start;
  gap:1rem;
  padding:1.35rem 1.5rem;
  border-left:3px solid var(--coral);
  background:var(--coral-soft)
}
.notice>span{
  border:1px solid currentColor;
  border-radius:50%;
  width:24px;
  height:24px;
  flex-shrink:0;
  text-align:center;
  line-height:23px
}
.empty-state{
  padding:3rem 1.3rem;
  text-align:center;
  color:var(--muted)
}
.empty-state h3{
  font-family:var(--serif);
  font-weight:400;
  font-size:1.8rem;
  margin-bottom:.6rem
}
.empty-state p{
  margin:0 auto 1rem
}
.sr-only{
  position:absolute;
  width:1px;
  height:1px;
  padding:0;
  margin:-1px;
  overflow:hidden;
  clip:rect(0,0,0,0);
  white-space:nowrap;
  border:0
}
@media(prefers-reduced-motion:reduce){
  html{
    scroll-behavior:auto
  }
  *,*::before,*::after{
    animation:none!important;
    transition:none!important;
    scroll-behavior:auto!important
  }
}

}
````

## css/components.css

````css
@layer components {
/* Controles y superficies con la misma jerarquía en todos los módulos. */ .kidney-hotspot{
  cursor:pointer;
  outline:none
}
.kidney-hotspot .hotspot-halo{
  fill:var(--paper);
  stroke:var(--ink);
  stroke-width:1.4;
  transition:opacity .18s
}
.kidney-hotspot .hotspot-center{
  fill:var(--ink)
}
.kidney-hotspot[aria-pressed=true] .hotspot-halo{
  fill:var(--ink)
}
.kidney-hotspot[aria-pressed=true] .hotspot-center{
  fill:var(--paper)
}
.kidney-hotspot:hover .hotspot-halo,.kidney-hotspot:focus .hotspot-halo{
  stroke:var(--blue);
  stroke-width:4
}
.kidney-outline{
  fill:#cf8270;
  stroke:#9d5445;
  stroke-width:1.5
}
.medulla-region{
  fill:#e6aa88;
  stroke:#bb7658;
  stroke-width:1
}
.kidney-detail-line{
  fill:none;
  stroke:#a55745;
  stroke-width:1.1
}
.kidney-label{
  font-family:var(--sans);
  font-size:12px;
  fill:#435d4d;
  letter-spacing:.03em
}
.kidney-label-line{
  stroke:#8c9e86;
  stroke-width:1;
  fill:none
}
.chart-toolbar{
  display:flex;
  justify-content:space-between;
  gap:1rem;
  align-items:flex-start
}
.chart-toolbar h2{
  font-family:var(--sans);
  letter-spacing:0;
  font-size:1.125rem;
  font-weight:700
}
.chart-toolbar .eyebrow{
  margin-bottom:.4rem;
  font-size:.75rem
}
.period-control{
  display:flex;
  background:#f0f2eb;
  padding:.2rem;
  border-radius:4px;
  flex-shrink:0
}
.period-control button{
  font-size:.875rem;
  padding:.35rem .6rem;
  min-height:34px;
  background:none;
  border:0
}
.period-control [aria-pressed=true]{
  background:var(--surface);
  box-shadow:0 1px 3px #173e361a
}
.metric-summary{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  margin-top:1.8rem
}
.metric-summary strong{
  font-size:3rem;
  line-height:1;
  font-weight:400;
  letter-spacing:-.055em;
  color:var(--blue)
}
.metric-summary span{
  font-size:1rem;
  color:var(--muted);
  margin-left:.5rem
}
.metric-summary p{
  font-size:.875rem;
  max-width:27ch;
  color:var(--muted)
}
.trend-chart{
  position:relative;
  min-height:225px;
  margin:1.3rem -.3rem 0
}
.chart-svg{
  display:block;
  width:100%;
  height:auto;
  overflow:visible
}
.chart-svg text{
  font:14px var(--sans);
  fill:#53695d
}
.chart-svg .chart-gridline{
  stroke:#d8dfd3;
  stroke-width:1
}
.chart-svg .chart-line{
  fill:none;
  stroke:var(--blue);
  stroke-width:2.5;
  stroke-linejoin:round;
  stroke-linecap:round
}
.chart-svg .chart-point{
  fill:var(--surface);
  stroke:var(--blue);
  stroke-width:2.5;
  cursor:crosshair
}
.chart-svg .chart-point:hover,.chart-svg .chart-point:focus{
  fill:var(--blue);
  stroke-width:5;
  outline:0
}
.chart-footer{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  border-top:1px solid var(--line);
  padding-top:1rem;
  font-size:.875rem
}
.chart-footer select{
  padding:.5rem;
  font-size:.9375rem;
  max-width:60%
}
.chart-tooltip{
  position:absolute;
  pointer-events:none;
  background:var(--ink);
  color:var(--paper);
  padding:.55rem .8rem;
  font-size:.875rem;
  border-radius:4px;
  z-index:2;
  bottom:100%;
  left:50%;
  transform:translateX(-50%);
  white-space:nowrap
}
.table-scroll{
  overflow:auto;
  border-top:1px solid var(--line);
  overscroll-behavior:contain
}
.results-table{
  border-collapse:collapse;
  width:100%;
  text-align:left;
  font-size:.9375rem;
  white-space:nowrap
}
.results-table th{
  padding:.9rem .7rem;
  font-size:.875rem;
  font-weight:400;
  color:var(--muted);
  background:var(--studio);
  border-bottom:1px solid var(--line)
}
.results-table td{
  padding:.9rem .7rem;
  border-bottom:1px solid var(--line)
}
.results-table tr:hover td{
  background:#edf1e7
}
.results-table td:first-child{
  font-weight:700
}
.status-badge{
  display:inline-flex;
  align-items:center;
  gap:.3rem;
  padding:.25rem .5rem;
  border-radius:4px;
  font-size:.8125rem;
  border:1px solid transparent
}
.status-badge.within{
  background:var(--green-soft);
  color:var(--green)
}
.status-badge.attention{
  background:var(--amber-soft);
  color:var(--amber)
}
.status-badge.consult{
  background:var(--coral-soft);
  color:var(--danger)
}
.status-badge.pending{
  background:var(--blue-soft);
  color:var(--blue)
}
.table-explanation{
  font-size:.875rem;
  color:var(--muted);
  padding:.75rem 0
}
.date-filters{
  display:flex;
  gap:1rem;
  align-items:flex-end;
  flex-wrap:wrap;
  margin-bottom:1rem
}
.date-filters label{
  display:flex;
  gap:.3rem;
  flex-direction:column;
  font-size:.875rem
}
.date-filters input{
  font-size:.9375rem;
  min-width:140px
}
.results-section>.fine-print{
  margin-top:1rem
}
.recipe-card{
  position:relative;
  border:1px solid var(--line);
  background:var(--surface);
  border-radius:14px;
  padding:1.75rem 1.6rem;
  display:flex;
  flex-direction:column;
  min-height:300px;
  box-shadow: var(--card-shadow, 0 1px 3px rgba(15,45,64,.05));
}
.recipe-meta{
  display:flex;
  align-items:center;
  justify-content:space-between;
  font-size:.875rem;
  color:var(--muted);
  margin-bottom:1.3rem
}
.recipe-number{
  font-family:var(--serif);
  font-size:2.8rem;
  line-height:1;
  color:#607c66;
  letter-spacing:-.045em
}
.recipe-title{
  font-family:var(--serif);
  font-size:1.8rem;
  font-weight:400;
  letter-spacing:-.02em;
  max-width:17ch
}
.recipe-summary{
  font-size:.9375rem;
  color:var(--muted);
  margin:1rem 0 1.5rem;
  flex:1
}
.recipe-card-bottom{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:.6rem;
  border-top:1px solid var(--line);
  padding-top:1rem
}
.recipe-card-bottom .text-link{
  font-size:.9375rem
}
.recipe-validation{
  font-size:.75rem;
  letter-spacing:.06em;
  color:var(--coral);
  margin-top:1rem
}
.favorite-button{
  border:1px solid var(--line);
  background:none;
  border-radius:50%;
  width:40px;
  height:40px;
  display:grid;
  place-items:center
}
.favorite-button[aria-pressed=true]{
  background:var(--coral-soft);
  color:var(--coral);
  border-color:#d7ac98
}
.favorite-button[aria-pressed=true] svg{
  fill:currentColor
}
.recipe-card .tag{
  font-size:.8125rem;
  padding:.25rem .4rem
}
.recipe-grid>.empty-state{
  grid-column:1/-1
}
.progress-orbit{
  position:relative;
  width:100%;
  max-width:210px;
  aspect-ratio:1;
  margin:1.2rem auto
}
.progress-orbit svg{
  width:100%;
  height:100%;
  transform:rotate(-90deg)
}
.progress-orbit circle{
  fill:none;
  stroke-width:9
}
.orbit-track{
  stroke:#ccd7c3
}
.orbit-value{
  stroke:var(--ink);
  stroke-linecap:round;
  stroke-dasharray:540.36;
  stroke-dashoffset:540.36;
  transition:stroke-dashoffset .5s var(--ease)
}
.progress-orbit strong{
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:3.5rem;
  font-weight:400;
  color:var(--ink);
  letter-spacing:-.05em
}
.progress-orbit small{
  font-size:1.2rem;
  margin-top:1.2rem;
  letter-spacing:0
}
.streak-box{
  display:flex;
  align-items:center;
  gap:.8rem;
  margin:1.2rem 0;
  padding:1.1rem 0;
  border-top:1px solid #bfccb8
}
.streak-box strong{
  font:2.5rem/1 var(--serif);
  color:var(--ink)
}
.streak-box span{
  font-size:.875rem;
  line-height:1.3
}
.habit-grid{
  display:grid;
  grid-template-columns:minmax(160px,1.7fr) repeat(7,minmax(38px,1fr));
  gap:0;
  align-items:center
}
.habit-day-heading{
  font-size:.8125rem;
  text-align:center;
  padding-bottom:1rem;
  color:var(--muted);
  border-bottom:1px solid var(--line);
  align-self:stretch;
  display:flex;
  flex-direction:column;
  gap:.2rem;
  justify-content:flex-end
}
.habit-day-heading strong{
  font-size:1.05rem;
  font-weight:400;
  color:var(--ink)
}
.habit-day-heading.today strong{
  background:var(--ink);
  color:var(--paper);
  border-radius:50%;
  width:30px;
  height:30px;
  align-self:center;
  display:grid;
  place-items:center
}
.habit-label{
  padding:1rem .6rem 1rem 0;
  border-bottom:1px solid var(--line);
  align-self:stretch;
  font-size:.9375rem;
  line-height:1.3;
  display:flex;
  flex-direction:column;
  justify-content:center
}
.habit-label small{
  font-size:.8125rem;
  color:var(--muted);
  margin-top:.3rem
}
.habit-cell{
  align-self:stretch;
  display:grid;
  place-items:center;
  border-bottom:1px solid var(--line);
  padding:.7rem .1rem
}
.habit-check{
  width:34px;
  height:34px;
  border:1px solid #a2b19b;
  background:transparent;
  border-radius:50%;
  display:grid;
  place-items:center;
  font-size:1.1rem;
  color:var(--ink)
}
.habit-check[aria-pressed=true]{
  background:var(--ink);
  color:var(--paper);
  border-color:var(--ink)
}
.habit-check:hover:not(:disabled){
  background:var(--sage)
}
.habit-check[aria-pressed=true]:hover{
  background:#3d6352
}
.habit-check:disabled{
  border-style:dashed;
  opacity:.45
}
.early-detection{
  padding:1.5rem 1.8rem;
  background:var(--blue-soft);
  border-left:3px solid var(--blue);
  display:flex;
  gap:2rem;
  align-items:center
}
.early-detection strong{
  font-size:1.125rem;
  max-width:20ch;
  flex-shrink:0
}
.early-detection p{
  font-size:1rem
}
.symptom-category{
  padding:2rem 0;
  border-bottom:1px solid var(--line)
}
.symptom-category .small-label{
  color:var(--coral);
  margin-bottom:.5rem
}
.symptom-category h2{
  font-size:2rem;
  max-width:24ch
}
.symptom-category>p{
  font-size:.9375rem;
  color:var(--muted);
  margin-top:.7rem
}
.symptom-category ul{
  margin-bottom:0
}
.symptom-checks{
  display:grid;
  gap:.5rem
}
.symptom-checks label{
  display:flex;
  align-items:flex-start;
  gap:.8rem;
  cursor:pointer;
  padding:.8rem .9rem;
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:4px;
  font-size:.9375rem
}
.symptom-checks label:has(input:checked){
  border-color:var(--ink);
  background:var(--studio)
}
.symptom-checks label.urgent-option{
  border-left:3px solid var(--coral)
}
.symptom-result{
  padding:1.3rem;
  background:var(--studio);
  border-left:3px solid var(--ink);
  margin-top:1.5rem
}
.symptom-result.urgent{
  background:var(--coral-soft);
  border-color:var(--coral)
}
.symptom-result h3{
  margin-bottom:.5rem
}
.symptom-result p{
  font-size:.9375rem
}
.symptom-result small{
  display:block;
  margin-top:.8rem
}
.credits-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:2rem 3rem
}
.credit-block{
  border-top:1px solid var(--line);
  padding-top:1.3rem
}
.credit-block>span{
  font-size:.875rem;
  color:var(--coral)
}
.credit-block h2{
  font-size:2rem;
  margin:.6rem 0 1rem
}
.universities{
  padding:1.8rem 0 2rem;
  margin:2rem 0;
  border-top:1px solid var(--line);
  border-bottom:1px solid var(--line)
}
.university-list{
  display:flex;
  justify-content:space-between;
  gap:2rem;
  margin:1.6rem 0;
  font-family:var(--serif);
  font-size:1.7rem;
  line-height:1.3
}
.university-list span{
  max-width:18ch
}
.source-item{
  display:grid;
  grid-template-columns:1fr 1.3fr;
  gap:2rem;
  border-top:1px solid var(--line);
  padding:1.2rem 0;
  font-size:.9375rem
}
.source-item a{
  font-size:1rem;
  color:var(--ink);
  text-decoration:underline;
  text-underline-offset:4px
}
.source-item small{
  display:block;
  margin-top:.5rem;
  color:var(--muted);
  font-size:.875rem
}
.source-pending{
  background:var(--amber-soft);
  padding:1.1rem 1.3rem;
  margin:1rem 0 2rem;
  font-size:.9375rem
}
.toast{
  position:fixed;
  bottom:1.5rem;
  left:50%;
  transform:translateX(-50%);
  z-index:100;
  max-width:min(90vw,600px);
  padding:1rem 1.4rem;
  background:var(--ink);
  color:var(--paper);
  border-radius:6px;
  box-shadow:0 4px 20px #173e3626;
  font-size:.9375rem;
  text-align:center
}
.startup-error{
  position:fixed;
  inset:0;
  z-index:100;
  background:var(--paper);
  padding:4rem 10vw
}
.startup-error p{
  margin:2rem 0
}
.startup-error a{
  text-decoration:underline
}
dialog{
  background:var(--surface);
  color:var(--text);
  border:1px solid var(--line);
  padding:2rem;
  border-radius:var(--radius);
  width:min(90vw,680px);
  max-height:90dvh;
  overflow:auto
}
dialog::backdrop{
  background:#102a2499;
  backdrop-filter:blur(3px)
}
.dialog-heading{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:1rem;
  margin-bottom:1.3rem
}
.dialog-heading h2{
  font-size:2.5rem
}
.dialog-heading .eyebrow{
  font-size:.8125rem;
  margin-bottom:.5rem
}
.dialog-intro{
  font-size:.9375rem;
  margin-bottom:1.5rem;
  color:var(--muted)
}
.sheet-dialog{
  margin:0 0 0 auto;
  height:100dvh;
  max-height:100dvh;
  width:min(92vw,600px);
  border-radius:0;
  border-right:0;
  padding:2rem
}
.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1.1rem
}
.form-field{
  display:flex;
  flex-direction:column;
  gap:.35rem;
  font-size:.9375rem
}
.form-field:first-child{
  grid-column:1/-1
}
.form-field .unit-label{
  font-size:.8125rem;
  color:var(--muted)
}
.form-field input{
  width:100%;
  min-width:0
}
.form-field .field-hint{
  font-size:.8125rem;
  color:var(--muted);
  line-height:1.4
}
.form-error{
  color:var(--danger);
  font-size:.9375rem;
  margin:1rem 0;
  min-height:1.45rem
}
.dialog-actions{
  display:flex;
  justify-content:flex-end;
  gap:.8rem;
  margin-top:1.5rem;
  border-top:1px solid var(--line);
  padding-top:1.3rem
}
.confirm-dialog h2{
  font-size:2.2rem;
  margin-bottom:1rem
}
.reference-content p{
  margin-bottom:1rem
}
.reference-table{
  width:100%;
  border-collapse:collapse;
  margin:1.4rem 0;
  font-size:.9375rem
}
.reference-table td{
  padding:.6rem .2rem;
  border-bottom:1px solid var(--line)
}
.reference-table td:last-child{
  text-align:right
}
.recipe-dialog{
  width:min(94vw,900px)
}
.recipe-detail-grid{
  display:grid;
  grid-template-columns:.8fr 1fr;
  gap:2.2rem;
  margin:1.8rem 0
}
.recipe-detail-grid h3{
  font-size:1.05rem
}
.recipe-detail-grid ul,.recipe-detail-grid ol{
  padding-left:1.3rem
}
.recipe-detail-note{
  background:var(--studio);
  padding:1.2rem
}
.recipe-detail-note strong{
  display:block;
  margin-bottom:.4rem
}
.recipe-detail-note p{
  font-size:.9375rem
}
.recipe-detail-meta{
  display:flex;
  align-items:center;
  gap:1rem;
  margin-top:.7rem;
  font-size:.9375rem;
  color:var(--muted)
}
.recipe-dialog .fine-print{
  margin-top:1rem
}
.presentation-dialog{
  width:100vw;
  height:100dvh;
  max-width:none;
  max-height:none;
  margin:0;
  border:0;
  border-radius:0;
  background:var(--paper);
  padding:clamp(1rem,3vw,3rem);
  overflow:auto
}
.presentation-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  font-size:.9375rem;
  color:var(--muted)
}
.presentation-brand{
  font-family:var(--serif);
  font-size:1.9rem;
  color:var(--ink)
}
.presentation-slide{
  min-height:65dvh;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:clamp(1.5rem,5vw,5rem);
  align-items:center;
  max-width:1250px;
  margin:2rem auto
}
.presentation-slide .slide-content h2{
  font-size:clamp(2.8rem,5vw,5rem);
  line-height:1.08;
  max-width:19ch
}
.presentation-slide .slide-content>p:not(.eyebrow){
  font-size:clamp(1.125rem,1.7vw,1.5rem);
  margin-top:1.5rem
}
.presentation-slide ul{
  font-size:1.2rem;
  line-height:1.6
}
.slide-visual{
  background:var(--studio);
  padding:2rem;
  border-radius:4px;
  max-width:100%;
  overflow:hidden
}
.slide-visual svg{
  width:100%;
  height:auto;
  display:block
}
.slide-visual .slide-number{
  font-family:var(--serif);
  font-size:clamp(4rem,9vw,9rem);
  line-height:1;
  color:var(--ink);
  margin-bottom:1.3rem;
  letter-spacing:-.05em
}
.slide-visual p{
  font-size:1.25rem;
  line-height:1.5
}
.slide-visual .fine-print{
  font-size:.9375rem;
  margin-top:1.2rem
}
.slide-visual .slide-step{
  font-size:1.1rem;
  padding:.85rem 0;
  border-top:1px solid #b8c7b0
}
.slide-visual .mini-recipe{
  padding:1rem 0;
  border-top:1px solid #b8c7b0;
  font-family:var(--serif);
  font-size:1.9rem
}
.slide-visual .university-list{
  flex-direction:column;
  font-size:1.8rem;
  margin:0;
  gap:1.3rem
}
.presentation-controls{
  max-width:1250px;
  margin:auto;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1rem
}
.slide-dots{
  display:flex;
  gap:.5rem;
  flex-wrap:wrap;
  justify-content:center
}
.slide-dots button{
  width:28px;
  height:28px;
  padding:9px;
  border:0;
  background:transparent;
  display:grid;
  place-items:center
}
.slide-dots button::after{
  content:'';
  width:8px;
  height:8px;
  border-radius:50%;
  background:#a7b59e
}
.slide-dots button[aria-current=step]::after{
  background:var(--ink);
  width:11px;
  height:11px
}
.presentation-hint{
  text-align:center;
  color:var(--muted);
  font-size:.875rem;
  margin:1rem auto 0
}
.filter-diagram svg{
  display:block;
  width:100%;
  height:auto
}
.filter-diagram .filter-label{
  font:14px var(--sans);
  fill:var(--muted)
}
.filter-diagram .filter-dot{
  fill:var(--blue)
}
.filter-diagram .protein-dot{
  fill:var(--coral)
}
.mini-result-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1rem;
  margin-top:.7rem
}
.mini-result-grid>div{
  border-top:1px solid var(--line);
  padding-top:1rem
}
.mini-result-grid span{
  display:block;
  font-size:.875rem;
  color:var(--muted)
}
.mini-result-grid strong{
  display:block;
  font-size:2.1rem;
  line-height:1.3;
  color:var(--blue);
  font-weight:400;
  margin:.2rem 0
}
.mini-result-grid small{
  font-size:.875rem;
  color:var(--muted)
}
.mini-tracking .tag{
  margin-bottom:.7rem
}
.home-empty{
  padding:1.1rem 0;
  color:var(--muted)
}
/* Movimiento 2.1: controles activos desde el inicio; la entrada no es una carga. */
.motion-ready .route {
  animation: none;
}
.motion-ready .kidney-hotspot[aria-pressed=true] .hotspot-halo {
  animation: renal-focus 850ms ease-out 2;
}
@keyframes renal-focus {
  0%, 100% {stroke-width: 1.4;}
  45% {stroke-width: 4; stroke: var(--sage-dark);}
}
@media (hover: hover) and (pointer: fine) {
  .motion-ready .recipe-card {
    transition: transform 180ms var(--ease), border-color 180ms var(--ease);
  }
  .motion-ready .recipe-card:hover {
    transform: translateY(-3px);
    border-left-color: #91a68c;
    border-right-color: #91a68c;
  }
  .motion-ready .button {
    transition: background 160ms ease, color 160ms ease, transform 160ms ease;
  }
  .motion-ready .button:hover {
    transform: translateY(-1px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .motion-ready .recipe-card:hover, .motion-ready .button:hover {transform: none;}
}
@media(max-width:640px){
  .chart-toolbar{
    flex-direction:column;
    gap:.8rem
  }
  .metric-summary{
    flex-direction:column;
    align-items:flex-start;
    gap:.6rem
  }
  .metric-summary p{
    max-width:none
  }
  .trend-chart{
    min-height:165px
  }
  .chart-footer{
    align-items:flex-start;
    flex-direction:column
  }
  .chart-footer select{
    max-width:100%;
    width:100%
  }
  .date-filters{
    gap:.65rem
  }
  .date-filters label{
    flex:1;
    min-width:0
  }
  .date-filters input{
    min-width:0;
    width:100%;
    font-size:.875rem
  }
  .recipe-card{
    padding:1.4rem;
    min-height:280px
  }
  .habit-grid{
    grid-template-columns:minmax(108px,1.3fr) repeat(7,minmax(24px,1fr))
  }
  .habit-check{
    width:26px;
    height:30px;
    font-size:.9rem
  }
  .habit-cell{
    padding:.7rem 0
  }
  .habit-label{
    font-size:.875rem;
    padding:.85rem .3rem .85rem 0
  }
  .habit-label small{
    font-size:.75rem
  }
  .habit-day-heading{
    font-size:.75rem
  }
  .habit-day-heading strong{
    font-size:.9375rem
  }
  .habit-day-heading.today strong{
    width:25px;
    height:25px
  }
  .early-detection{
    flex-direction:column;
    gap:.7rem;
    padding:1.3rem
  }
  .early-detection strong{
    max-width:none
  }
  .symptom-category{
    padding:1.5rem 0
  }
  .symptom-category h2{
    font-size:1.9rem
  }
  .credits-grid{
    grid-template-columns:1fr;
    gap:1.5rem
  }
  .university-list{
    flex-direction:column;
    gap:1.3rem
  }
  .source-item{
    grid-template-columns:1fr;
    gap:.65rem
  }
  .source-item small{
    font-size:.8125rem
  }
  .sheet-dialog{
    width:100vw;
    padding:1.3rem
  }
  .dialog-heading h2{
    font-size:2rem
  }
  .form-grid{
    gap:.85rem
  }
  .form-field{
    font-size:.875rem
  }
  .recipe-dialog{
    padding:1.3rem
  }
  .recipe-detail-grid{
    grid-template-columns:1fr;
    gap:1rem
  }
  .recipe-detail-meta{
    flex-wrap:wrap;
    gap:.5rem 1rem
  }
  .presentation-slide{
    grid-template-columns:1fr;
    gap:1.4rem;
    margin:1.2rem auto;
    min-height:65dvh
  }
  .presentation-slide .slide-content h2{
    font-size:2.5rem
  }
  .presentation-slide .slide-content>p:not(.eyebrow){
    font-size:1.1rem;
    margin-top:1rem
  }
  .slide-visual{
    padding:1.3rem
  }
  .slide-visual svg{
    max-height:260px
  }
  .slide-visual .slide-number{
    font-size:4rem
  }
  .slide-visual p{
    font-size:1.1rem
  }
  .presentation-controls .button{
    padding:.7rem .8rem;
    font-size:.9375rem
  }
  .slide-dots{
    gap:0
  }
  .slide-dots button{
    width:20px;
    height:26px;
    padding:6px
  }
  .presentation-hint{
    font-size:.8125rem
  }
  .presentation-top{
    font-size:.875rem
  }
  .presentation-brand{
    font-size:1.5rem
  }
  .mini-result-grid strong{
    font-size:1.9rem
  }
}
@media(min-width:641px) and (max-width:760px){
  .habit-grid{
    grid-template-columns:minmax(160px,1.5fr) repeat(7,1fr)
  }
}

}
````

## css/extensions.css

````css
@layer extensions {
/* Herramientas de producto: identidad editorial y controles discretos. */
:root{--header-height:80px}
html{scroll-padding-top:10rem}
textarea{font:inherit;width:100%;resize:vertical;background:var(--surface);color:var(--ink);border:1px solid var(--muted);border-radius:4px;padding:.75rem;max-width:100%}
textarea:focus-visible{outline:3px solid var(--blue);outline-offset:4px}
button,a,input,select{touch-action:manipulation}
.workspace-strip{padding:.45rem var(--gutter);max-width:calc(var(--max-width) + 2 * var(--gutter));margin:auto;display:flex;gap:1.2rem;align-items:center;border-top:1px solid var(--line);font-size:.8rem;min-height:48px}
.workspace-strip>.fine-print{margin-right:auto;font-size:.8rem}
.workspace-strip .text-link{font-size:.8rem;min-height:32px}
.profile-select{display:flex;align-items:center;gap:.55rem}
.profile-select select{padding:.25rem .65rem;min-height:32px;max-width:150px;font-size:.85rem}
.header-inner{gap:1.1rem}.header-tools{gap:.25rem}.utility-button{width:38px;height:38px;font-size:1.35rem}
#main-nav{gap:clamp(.7rem,1.7vw,1.6rem)}
.tool-row{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.tracking-tools{margin:-.3rem 0 1.8rem;border-bottom:1px solid var(--line);padding-bottom:1.2rem}
.tracking-tools .button{padding:.55rem .85rem;min-height:40px;font-size:.9rem}.tracking-tools .text-link{font-size:.9rem}
.checkbox-control{display:flex;align-items:center;gap:.5rem;min-height:32px;margin:.25rem 0}.checkbox-control input{width:20px;height:20px}
.form-field>span:first-child{display:block}.form-field{gap:.4rem}.form-field textarea{min-width:0}.settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.3rem;margin:1.5rem 0}.settings-profiles{border-top:1px solid var(--line);margin-top:1.7rem;padding-top:1.5rem}.settings-profiles h3{margin-bottom:.5rem}.settings-profiles .tool-row{margin:1rem 0}.inline-form{display:flex;gap:.75rem;align-items:flex-end;margin:1rem 0}.inline-form label{flex:1;min-width:0}.inline-form label span{display:block;margin-bottom:.4rem}.inline-form input{width:100%}.inline-form .button{font-size:.9rem}.file-input{position:absolute;width:1px;height:1px;opacity:0}.button:has(.file-input){position:relative;cursor:pointer}.button:has(.file-input:focus-visible){outline:3px solid var(--blue);outline-offset:4px}
.welcome-panel{position:fixed;z-index:30;right:1.5rem;bottom:1.5rem;width:390px;max-width:calc(100vw - 2rem);background:var(--surface);border:1px solid var(--line);border-top:3px solid var(--coral);padding:1.5rem;box-shadow:0 12px 45px #102a242a;border-radius:8px}.welcome-top{display:flex;align-items:center;justify-content:space-between}.welcome-top .eyebrow{margin:0}.welcome-panel h2{font-size:1.65rem;line-height:1.15;margin:.7rem 0 1rem}.welcome-panel p{font-size:.875rem}.welcome-panel>.button{margin-top:1rem;width:100%;padding:.65rem 1rem;min-height:42px}.segmented{display:inline-flex;border:1px solid var(--line);border-radius:4px;padding:3px;gap:3px}.segmented button{padding:.5rem .9rem;border:0;background:transparent;min-height:36px}.segmented [aria-pressed=true]{background:var(--ink);color:var(--paper)}.welcome-choices{display:grid;gap:.5rem}.welcome-choices button{background:var(--paper);padding:.6rem;border:1px solid var(--line);text-align:left;min-height:40px;font-size:.9rem}.welcome-choices [aria-pressed=true]{background:var(--studio);border-color:var(--ink)}
.recovery-banner{position:fixed;z-index:40;bottom:1rem;left:1rem;right:1rem;background:var(--surface);padding:1.5rem;border:2px solid var(--coral);box-shadow:0 6px 30px #0003}.recovery-banner h2{font-size:1.7rem}.recovery-banner p{margin:.75rem 0}.recovery-banner button{margin-right:1rem}
.search-dialog{max-width:640px}.search-dialog #global-search{width:100%;font-size:1.1rem}.search-dialog #search-announcement{margin:1rem 0}.search-dialog #search-results{max-height:55vh;overflow:auto;padding:0 5px}.search-dialog #search-results h3{font:.75rem var(--sans);text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin:1.4rem .5rem .3rem}.search-result{display:flex;align-items:center;justify-content:space-between;width:100%;gap:1rem;background:transparent;border:0;padding:.85rem .7rem;text-align:left;border-radius:4px;min-height:44px}.search-result small{font-size:.75rem;color:var(--muted);white-space:nowrap}.search-result[aria-selected=true]{background:var(--studio);outline:1px solid var(--line)}.shortcut-list{display:grid;grid-template-columns:max-content 1fr;gap:1rem;align-items:start}.shortcut-list dd{margin:0}kbd{font:.85rem var(--sans);border:1px solid var(--line);border-bottom-width:3px;padding:.3rem .45rem;border-radius:4px;display:inline-block;color:var(--ink)}
.comparison-surface{display:grid;gap:1.2rem;padding:1.5rem;background:var(--studio);margin:2rem 0;border-radius:6px}.comparison-surface h3{font-size:.95rem;font-weight:400;color:var(--muted)}.comparison-surface .eyebrow{margin-bottom:.5rem}.comparison-inputs{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}.comparison-inputs label span{display:block;margin-bottom:.4rem}.comparison-inputs select{width:100%;min-width:0}.comparison-surface>p{font-size:1.05rem;font-weight:700}.professional-field{max-width:750px}.record-extra{grid-column:1/-1}fieldset{border:1px solid var(--line);border-radius:4px;padding:1rem}legend{padding:0 .4rem;font-weight:700}.record-note-cell{min-width:180px;max-width:300px;white-space:normal!important}.import-summary{display:grid;gap:.5rem;padding:1rem;background:var(--studio);margin:1rem 0}.csv-preview{max-height:340px;overflow:auto}.csv-preview li{font-size:.9rem}.csv-preview+.form-field{margin-bottom:1rem}#story-content p{margin-bottom:1.2rem}.glucose-only [data-metric]:not([data-metric=glucose]){display:none}.glucose-only #metric-select{display:none}
.portion-controls{display:flex;gap:1rem;align-items:flex-end;margin:1.2rem 0;flex-wrap:wrap}.portion-controls label span{display:block;font-size:.85rem;margin-bottom:.4rem}.portion-controls input{max-width:100px}.portion-controls .button{min-height:44px;padding:.65rem 1rem}.shopping-surface{margin:3rem 0 0;padding:2rem;background:var(--studio);border:1px solid var(--line);border-radius:6px}.shopping-surface .section-heading{gap:1rem;flex-wrap:wrap}.shopping-surface h2{font-size:2rem}.shopping-surface ul{columns:2;column-gap:3rem}.shopping-surface li{break-inside:avoid}.renal-food-warning{margin-top:1rem}
.calendar-view-toolbar{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}.calendar-view-toolbar .text-link{font-size:.85rem}.month-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px;margin:1rem 0}.month-weekday{font-size:.8rem;color:var(--muted);text-align:center;padding:.3rem}.month-day{aspect-ratio:1.05;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;background:var(--surface);border:1px solid var(--line);padding:.5rem;min-width:0;min-height:42px;position:relative}.month-day strong{font-size:.95rem}.month-day>span{font-size:.55rem;letter-spacing:.04em;color:var(--green)}.month-day small{position:absolute;right:.35rem;top:.2rem;color:var(--coral)}.month-day.today{border-color:var(--coral)}.month-day[aria-pressed=true]{background:var(--studio);outline:1px solid var(--ink)}.month-day-detail{padding:1rem;background:var(--studio)}.month-day-detail h3{font-size:1rem;margin-bottom:1rem}.month-habit-list{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}.month-habit-list button{background:var(--surface);border:1px solid var(--line);padding:.6rem;text-align:left;font-size:.85rem;display:flex;gap:.4rem;align-items:center;min-height:36px}.month-habit-list [aria-pressed=true]{background:var(--ink);color:var(--paper)}.habit-detail-tools{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:2.5rem}.streak-surface,.note-surface{padding:1.7rem;border:1px solid var(--line);border-radius:6px}.habit-detail-tools h2{font-size:1.8rem;margin-bottom:1rem}.habit-streaks>div{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.75rem 0;border-bottom:1px solid var(--line);font-size:.9rem}.habit-streaks strong{font-size:.8rem;font-weight:400;color:var(--muted);white-space:nowrap}.note-surface .form-field{margin-bottom:1rem}
.guidance-label{display:flex;align-items:center;gap:.6rem;font-size:.8rem!important;letter-spacing:.06em;font-weight:700;margin:0 0 1rem!important}.guidance-label span{font-size:1.5rem}.symptom-result{border-left:4px solid var(--blue)}.symptom-result.urgent{border:2px solid var(--danger);border-left-width:6px}.urgent-text{border-left:6px solid var(--danger)}#prepare-visit{display:flex;margin-top:.6rem}
.studio-tools{display:flex;justify-content:space-between;gap:.75rem;flex-wrap:wrap;margin-top:1rem;border-top:1px solid var(--line);padding-top:.5rem}.studio-tools .text-link{font-size:.8rem}.part-focused{outline:2px solid var(--coral);outline-offset:6px;border-radius:2px}.anatomy-comparison{margin:2rem 0;padding:2rem;border:1px solid var(--line);background:var(--surface)}.anatomy-comparison h2{font-size:2rem}.part-comparison-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:1.5rem}.part-comparison-grid article{padding:1.5rem;background:var(--studio)}.part-comparison-grid article:nth-child(2){background:var(--blue-soft)}.part-comparison-grid h3{margin:.7rem 0}.large-part-index{font:3.5rem var(--serif);color:var(--muted);display:block;margin-top:1rem}.concept-section{margin-top:3.5rem;border-top:1px solid var(--line);padding-top:2rem;content-visibility:auto;contain-intrinsic-size:auto 650px}.concept-section h2{font-size:2.7rem}.concept-section .section-heading{flex-wrap:wrap;gap:1rem}.concept-layout{display:grid;grid-template-columns:1.5fr 1fr;gap:2.2rem;margin-top:1.5rem}.specimen-compare{aspect-ratio:1.3;position:relative;border:1px solid var(--line);border-radius:6px;overflow:hidden;background:var(--studio)}.specimen-before,.specimen-after{position:absolute;inset:0}.specimen-before{background:var(--studio);clip-path:inset(0 calc(100% - var(--split)) 0 0)}.specimen-after{background:var(--coral-soft)}.specimen-compare svg{width:100%;height:100%;padding:1.8rem 1rem .5rem}.specimen-after .kidney-outline{fill:#b47966}.specimen-after .medulla-region{fill:#be8b70;stroke-width:2.5;stroke-dasharray:7 2}.specimen-after .kidney-detail-line{stroke-width:calc(2px + var(--damage)*2px);opacity:calc(.5 + var(--damage)*.5)}.specimen-compare text{display:none}.specimen-divider{position:absolute;top:0;bottom:0;left:var(--split);width:2px;background:var(--surface);box-shadow:0 0 0 1px var(--coral);pointer-events:none}.specimen-divider span{position:absolute;top:48%;left:-17px;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:var(--surface);color:var(--ink);border:1px solid var(--coral);font-size:1.1rem}.specimen-label{position:absolute;top:.65rem;padding:.3rem .5rem;font-size:.75rem;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:3px}.specimen-label.before{left:.65rem}.specimen-label.after{right:.65rem}.concept-timeline{display:flex;gap:.5rem;justify-content:space-between}.concept-timeline button{padding:.35rem .4rem;background:transparent;border:0;border-bottom:2px solid var(--line);font-size:.75rem;min-height:32px}.concept-timeline [aria-pressed=true]{border-color:var(--coral);color:var(--coral)}.glomerulus-surface{padding:1.4rem 1.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px}.glomerulus-surface svg{max-height:210px;display:block;margin:auto}.glomerulus-surface h3{font:1.75rem/1.1 var(--serif);margin:.8rem 0}.glomerulus-surface>p{font-size:.95rem}.glomerulus-surface .fine-print{margin-top:1rem;font-size:.8rem}.concept-flow{animation:concept-flow var(--flow-duration) linear var(--flow-delay) infinite}@keyframes concept-flow{0%{opacity:0;transform:translateX(0)}25%{opacity:1}100%{opacity:0;transform:translateX(40px)}}.quiz-question{margin:1.2rem 0}.quiz-question legend{font-weight:400;font-size:1.05rem}.quiz-question .checkbox-control{font-size:.9rem}.quiz-question .fine-print{margin-top:.75rem}
.presentation-top{flex-wrap:wrap;gap:.8rem}.presentation-extra-tools{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;width:100%;border-top:1px solid var(--line);padding-top:.5rem}.presentation-extra-tools .text-link{font-size:.8rem;min-height:30px}.presentation-extra-tools time{font-variant-numeric:tabular-nums;min-width:4rem;color:var(--coral)}.presenter-notes{max-width:900px;margin:0 auto 1rem;background:var(--blue-soft);border-left:3px solid var(--blue);padding:1rem 1.3rem;position:relative;z-index:2}.presenter-notes h3{font-size:.9rem;margin-bottom:.5rem}.presenter-notes p{font-size:.95rem}.presenter-notes small{font-size:.75rem;display:block;margin-top:.7rem}.with-presenter-notes .presentation-slide{min-height:calc(100vh - 380px)}.waiting-scene{grid-column:1/-1;text-align:center;padding:3rem;max-width:950px;margin:auto}.waiting-scene h2{font-size:clamp(3rem,6vw,6rem)}.waiting-scene time{display:block;margin:2rem 0;font-size:2.5rem;font-variant-numeric:tabular-nums;color:var(--coral)}.waiting-scene p{margin:auto}
.education-section,.discovery-bottom,.habit-detail-tools,.shopping-surface{content-visibility:auto;contain-intrinsic-size:auto 550px}
[data-theme=dark] .studio-caption p,[data-theme=dark] .discovery-copy h1 em{color:var(--muted)}[data-theme=dark] .education-tabs [aria-selected=true],[data-theme=dark] .period-control{background:var(--studio)}[data-theme=dark] .daily-note{background:#253f32;color:var(--text)}[data-theme=dark] .daily-note h2{color:var(--ink)}[data-theme=dark] .daily-note .eyebrow{color:var(--muted)}[data-theme=dark] .large-index{color:var(--sage-dark)}[data-theme=dark] .recipe-number{color:var(--sage-dark)}[data-theme=dark] .chart-svg text,[data-theme=dark] .kidney-label{fill:var(--muted)}[data-theme=dark] .chart-gridline{stroke:var(--line)}[data-theme=dark] .button.primary:hover,[data-theme=dark] .habit-check:hover:not(:disabled){background:var(--sage);color:var(--ink)}[data-theme=dark] .chart-tooltip{background:var(--ink);color:var(--paper)}[data-theme=dark] .step-card{background:var(--studio)}[data-theme=dark] .filter-label{fill:var(--ink)}[data-theme=dark] .filter-dot{fill:var(--blue)}[data-theme=dark] .protein-dot{fill:var(--coral)}[data-theme=dark] .slide-visual .fine-print{color:var(--muted)}[data-theme=dark] .pictogram svg{color:var(--muted)}[data-theme=dark] .pictogram svg.highlight{color:var(--ink)}
[data-motion=reduced]{scroll-behavior:auto}[data-motion=reduced] *,[data-motion=reduced] *::before,[data-motion=reduced] *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}[data-motion=reduced] .kidney-visual svg{transform:none!important}[data-motion=reduced] .concept-flow{display:none}
@media(max-width:1150px){#main-nav{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--paper);border-bottom:1px solid var(--line);padding:.7rem var(--gutter)}#main-nav.open{display:flex}#main-nav a{padding:.8rem 0}.mobile-only{display:inline-flex}.concept-layout{gap:1.3rem}}
@media(max-width:760px){.concept-layout{grid-template-columns:1fr}.concept-section h2{font-size:2.15rem}.glomerulus-surface{display:grid;grid-template-columns:140px 1fr;gap:1rem}.glomerulus-surface>div{grid-row:span 2}.glomerulus-surface h3{margin:0;font-size:1.5rem}.glomerulus-surface .fine-print{grid-column:1/-1;margin:0}.habit-detail-tools{grid-template-columns:1fr}.shopping-surface ul{columns:1}.part-comparison-grid{gap:1rem}.workspace-strip>.fine-print{display:none}.workspace-strip{justify-content:space-between}.workspace-strip .profile-select{margin-right:auto}.header-inner{flex-wrap:wrap;gap:.5rem}.header-tools{flex-wrap:wrap;justify-content:flex-end}.brand{gap:.4rem}.brand-name{font-size:1.9rem}.header-tools .language-control{order:0}.utility-button{width:34px;height:34px}.header-tools .icon-button:not(.utility-button){width:34px;height:34px}.settings-grid{grid-template-columns:1fr}.inline-form{flex-wrap:wrap}.comparison-inputs{grid-template-columns:1fr}.date-filters{flex-wrap:wrap}.studio-tools{justify-content:flex-start}.part-comparison-grid{grid-template-columns:1fr}.anatomy-comparison{padding:1.2rem}.shortcut-list{grid-template-columns:1fr;gap:.5rem}.shortcut-list dd{margin-bottom:.7rem}.specimen-label{font-size:.65rem}.welcome-panel{right:1rem;bottom:1rem;padding:1.2rem}.welcome-panel h2{font-size:1.5rem}.welcome-panel{max-height:60vh;overflow:auto}.presentation-extra-tools{gap:.5rem}.presentation-extra-tools .text-link{font-size:.75rem}}
@media(max-width:440px){.header-inner{display:grid;grid-template-columns:auto 1fr;padding-top:.5rem;padding-bottom:.5rem}.header-tools{gap:0}.brand-project{font-size:.65rem}.brand-name{font-size:1.8rem}.brand>svg{width:22px}.language-control{padding:.1rem}.language-control button{padding:.3rem .35rem;min-width:26px}.header-tools .icon-button{width:29px;height:34px}.header-tools .utility-button{width:29px}.profile-select>span{display:none}.workspace-strip{gap:.65rem;padding:.35rem var(--gutter);min-height:42px}.workspace-strip select{max-width:120px}.workspace-strip .text-link{font-size:.75rem}.month-day{padding:.35rem}.month-day>span{font-size:.4rem}.month-habit-list{grid-template-columns:1fr}.streak-surface,.note-surface,.shopping-surface{padding:1.2rem}.glomerulus-surface{grid-template-columns:1fr}.glomerulus-surface>div{grid-row:auto;max-width:200px;margin:auto}.concept-timeline button{font-size:.65rem}.specimen-compare svg{padding:1.5rem .3rem .3rem}.specimen-label{font-size:.6rem}.table-actions .button{font-size:.85rem;padding:.7rem .85rem}.comparison-surface{padding:1.2rem}}
@media(prefers-reduced-motion:reduce){.concept-flow{display:none}}
@media print{.workspace-strip,.welcome-panel,.recovery-banner{display:none}.concept-flow{animation:none}.presenter-notes{display:none}}

button{min-width:24px;min-height:24px}.chapter-sources a{display:inline-flex;align-items:center;min-height:24px}.slide-dots button{width:24px;height:24px;background:transparent;position:relative}.slide-dots button::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--muted);position:absolute;inset:8px}.slide-dots button[aria-current]::before{background:var(--ink)}.hotspot-hit{stroke:none;pointer-events:all}

.part-buttons{min-height:76px}.studio-tools{min-height:44px}

/* La ampliación de texto conserva espacio para los controles y permite reflujo. */
main :is(div,section,article,aside,label,strong,span),.site-footer>*{min-width:0}
:is(h1,h2,h3,p,li,small,.tag,.credit-block,.university-list){overflow-wrap:anywhere}
main button,.site-footer button{max-width:100%;white-space:normal;overflow-wrap:anywhere}
input,select{max-width:100%;min-width:0}
.tag{white-space:normal}
.header-inner,.header-tools,.workspace-strip,.chart-toolbar,.metric-summary,.data-mode-bar,.table-actions,.week-bottom,.site-footer{flex-wrap:wrap}
.header-tools{justify-content:flex-end;min-width:0}
.university-list{flex-wrap:wrap}.university-list span{flex:1 1 12rem}
.early-detection strong,.data-mode-bar>button{flex-shrink:1}
.inline-form{flex-wrap:wrap}
input:not([type=range]),select,.search-box,.habit-check{border-color:var(--muted)}
@media(max-width:640px){.habit-grid{grid-template-columns:minmax(84px,1.3fr) repeat(7,minmax(24px,1fr))}.habit-score{grid-template-columns:min(120px,38%) minmax(0,1fr)}}
.file-input{padding:0;border:0;max-width:1px;max-height:1px;left:0;top:0;overflow:hidden;clip-path:inset(50%)}
.date-filters label{flex:1 1 12rem}.date-filters span{overflow-wrap:anywhere}
.metric-summary>div{display:flex;flex-wrap:wrap;align-items:baseline;gap:.25rem}.metric-summary span{margin-left:0}
.recipe-toggle-filters label span{overflow-wrap:anywhere}
#theme-toggle{font-size:24px}
.page-intro{flex-wrap:wrap}.large-index{flex-shrink:0}
.large-index{color:var(--sage-dark)}

}
````

## css/layout.css

````css
@layer layout {
.site-header{
  position:sticky;
  top:0;
  z-index:20;
  background:var(--paper);
  border-bottom:1px solid var(--line)
}
.header-inner{
  max-width:calc(var(--max-width) + 2 * var(--gutter));
  margin:auto;
  padding:0 var(--gutter);
  min-height:var(--header-height);
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:2rem
}
.brand{
  display:flex;
  align-items:center;
  gap:.65rem;
  color:var(--ink);
  flex-shrink:0
}
.brand-name{
  font-family:var(--serif);
  font-size:2.35rem;
  line-height:1;
  letter-spacing:-.055em
}
.brand-project{
  display:block;
  font-family:var(--sans);
  font-size:.75rem;
  letter-spacing:.11em;
  margin-top:.35rem;
  line-height:1.2
}
.header-tools{
  display:flex;
  align-items:center;
  gap:.7rem
}
#main-nav{
  display:flex;
  align-items:center;
  gap:clamp(1rem,2.2vw,2rem)
}
#main-nav a{
  position:relative;
  padding:1.65rem 0;
  font-size:1rem;
  white-space:nowrap;
  color:var(--muted)
}
#main-nav a[aria-current=page]{
  color:var(--ink)
}
#main-nav a[aria-current=page]::after{
  content:'';
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  height:2px;
  background:var(--ink)
}
.language-control{
  display:flex;
  gap:.1rem;
  padding:.2rem;
  border:1px solid var(--line);
  border-radius:4px
}
.language-control button{
  padding:.4rem .5rem;
  background:none;
  border:0;
  font-size:.875rem;
  min-height:34px
}
.language-control [aria-pressed=true]{
  background:var(--ink);
  color:var(--paper)
}
.mobile-only{
  display:none
}
.page-shell{
  max-width:calc(var(--max-width) + 2 * var(--gutter));
  margin:0 auto;
  padding:0 var(--gutter) 5rem
}
.route{
  animation:enter .36s var(--ease) both
}
.section-topline{
  padding:2.1rem 0 1.7rem;
  display:flex;
  justify-content:space-between;
  gap:1rem;
  font-size:.875rem;
  letter-spacing:.08em;
  color:var(--muted)
}
.discovery-grid{
  display:grid;
  grid-template-columns:1fr 1.03fr;
  gap:clamp(2rem,6vw,6rem);
  align-items:center
}
.kidney-studio{
  position:relative;
  padding:1.35rem 1.75rem 1.6rem;
  background:var(--studio);
  border-radius:4px;
  overflow:hidden
}
.studio-heading{
  display:flex;
  justify-content:space-between;
  gap:1rem
}
.studio-heading .small-label{
  font-size:.75rem
}
.kidney-visual{
  aspect-ratio:1.27;
  display:grid;
  place-items:center
}
.kidney-visual svg{
  height:100%;
  width:100%;
  overflow:visible;
  transform:translate(var(--pointer-x,0px),var(--pointer-y,0px));
  transition:transform .3s var(--ease)
}
.studio-caption{
  display:flex;
  align-items:flex-start;
  gap:1rem;
  min-height:116px;
  border-top:1px solid #c5d1bf;
  padding-top:1.05rem
}
.caption-index{
  font-size:.875rem;
  border:1px solid #8fa18e;
  border-radius:50%;
  width:30px;
  height:30px;
  display:grid;
  place-items:center;
  flex-shrink:0
}
.studio-caption h2{
  font-family:var(--sans);
  font-size:1.1rem;
  letter-spacing:0;
  font-weight:700;
  line-height:1.3;
  margin-bottom:.35rem
}
.studio-caption p{
  font-size:.9375rem;
  line-height:1.45;
  color:#4d6455;
  max-width:48ch
}
.part-buttons{
  display:flex;
  flex-wrap:wrap;
  gap:.35rem;
  margin-top:1rem
}
.part-buttons button{
  padding:.3rem .55rem;
  font-size:.875rem;
  border:1px solid #a9b8a2;
  background:transparent;
  min-height:36px
}
.part-buttons [aria-pressed=true]{
  background:var(--ink);
  color:var(--paper);
  border-color:var(--ink)
}
.discovery-copy{
  padding:.8rem 0
}
.discovery-copy h1{
  font-size:clamp(3.3rem,5.4vw,5.4rem);
  line-height:1.04;
  letter-spacing:-.055em
}
.discovery-copy h1 em{
  color:#5c775d
}
.hero-description{
  font-size:1.125rem;
  line-height:1.55;
  margin-top:1.65rem;
  max-width:39ch
}
.hero-actions{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:1.45rem;
  margin-top:1.75rem
}
.hero-message{
  display:flex;
  align-items:flex-start;
  gap:.9rem;
  margin-top:2.1rem;
  padding-top:1.4rem;
  border-top:1px solid var(--line);
  font-size:.9375rem;
  color:var(--muted)
}
.message-symbol{
  font-size:1.6rem;
  line-height:1.1;
  color:var(--coral)
}
.hero-footnote{
  display:flex;
  justify-content:space-between;
  gap:1rem;
  font-size:.875rem;
  color:var(--muted);
  margin-top:1.7rem
}
.education-section{
  margin-top:4rem
}
.section-heading{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:1.3rem;
  margin-bottom:1.7rem
}
.section-heading .eyebrow{
  margin-bottom:.7rem
}
.education-tabs{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  border-top:1px solid var(--line);
  border-bottom:1px solid var(--line)
}
.education-tabs button{
  background:none;
  border:0;
  border-radius:0;
  padding:1.3rem .7rem;
  display:flex;
  gap:1rem;
  align-items:center;
  text-align:left;
  position:relative;
  font-size:1rem
}
.education-tabs button>span:first-child{
  color:var(--muted);
  font-size:.875rem
}
.education-tabs [aria-selected=true]{
  color:var(--ink);
  background:#eef1e7
}
.education-tabs [aria-selected=true]::after{
  position:absolute;
  content:'';
  bottom:-1px;
  left:0;
  right:0;
  height:3px;
  background:var(--ink)
}
.education-panel{
  padding:2.4rem 0;
  border-bottom:1px solid var(--line)
}
.education-regular{
  display:grid;
  grid-template-columns:.85fr 1.15fr;
  gap:4rem
}
.education-regular h2{
  max-width:18ch
}
.education-regular .chapter-description{
  margin-top:1.2rem;
  font-size:1.1rem
}
.chapter-points h3{
  font-size:1.15rem;
  margin-bottom:1.2rem
}
.chapter-points ol{
  list-style:none;
  padding:0;
  margin:0;
  counter-reset:point
}
.chapter-points li{
  counter-increment:point;
  position:relative;
  padding:1rem 0 1rem 2.35rem;
  border-top:1px solid var(--line);
  margin:0;
  font-size:1rem
}
.chapter-points li:before{
  content:counter(point,decimal-leading-zero);
  position:absolute;
  left:0;
  color:var(--sage-dark);
  font-size:.875rem;
  top:1.1rem
}
.chapter-note{
  margin-top:1.7rem;
  padding:1.15rem 1.4rem;
  background:var(--studio);
  font-size:1rem
}
.chapter-sources{
  margin-top:1.2rem;
  display:flex;
  flex-wrap:wrap;
  gap:.6rem 1.5rem
}
.chapter-sources a{
  font-size:.875rem;
  text-decoration:underline;
  text-underline-offset:4px;
  color:var(--muted)
}
.discovery-bottom{
  display:grid;
  grid-template-columns:1fr 1fr;
  margin-top:3rem;
  gap:2.5rem
}
.daily-note{
  background:var(--ink);
  color:#e8efdc;
  padding:2.5rem;
  border-radius:4px
}
.daily-note h2{
  color:var(--paper);
  max-width:17ch
}
.daily-note p:not(.eyebrow){
  margin:1rem 0 1.5rem
}
.daily-note .eyebrow{
  color:#b9cbb4
}
.daily-note .primary{
  background:var(--sage);
  color:var(--ink)
}
.mini-tracking{
  padding:2rem .2rem
}
.mini-tracking .text-link{
  margin-top:1.4rem
}
.page-intro{
  padding:3.5rem 0 2rem;
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:2rem
}
.page-intro>div{
  max-width:56rem
}
.page-intro h1{
  max-width:21ch
}
.page-intro p:not(.eyebrow){
  max-width:58ch;
  margin-top:1.15rem;
  font-size:1.1rem
}
.page-intro .button{
  flex-shrink:0
}
.large-index{
  font-family:var(--serif);
  font-size:6rem;
  line-height:.85;
  color:#819a83
}
.data-mode-bar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1rem;
  padding:1rem 0;
  border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);
  margin-bottom:1.8rem;
  font-size:.9375rem
}
.data-mode-bar>div{
  display:flex;
  align-items:center;
  gap:.9rem
}
.demo-tag{
  background:var(--amber-soft);
  border-color:#d3c69b;
  color:var(--amber)
}
.data-mode-bar.personal .demo-tag{
  background:var(--blue-soft);
  color:var(--blue);
  border-color:#bbcdd8
}
.tracking-layout{
  display:grid;
  grid-template-columns:2.25fr 1fr;
  gap:2.2rem
}
.chart-surface{
  background:var(--surface);
  border:1px solid var(--line);
  padding:1.8rem;
  border-radius:var(--radius);
  min-width:0
}
.tracking-aside{
  padding:1.3rem .8rem
}
.tracking-aside h2{
  font-size:2.1rem;
  margin-bottom:1.2rem
}
.tracking-aside p{
  font-size:1rem
}
.aside-rule{
  height:1px;
  background:var(--line);
  margin:1.4rem 0
}
.tracking-aside .text-link{
  font-size:.9375rem;
  margin-top:.8rem
}
.local-label{
  display:block;
  color:var(--muted);
  font-size:.875rem;
  margin-top:1.6rem
}
.results-section{
  margin-top:3rem
}
.table-actions{
  display:flex;
  align-items:center;
  gap:1.2rem
}
.support-grid{
  display:grid;
  grid-template-columns:1fr 1.15fr;
  gap:2.5rem;
  margin-top:2.8rem
}
.food-teaser{
  background:var(--studio);
  padding:2rem
}
.food-teaser p:not(.eyebrow){
  margin:1rem 0 1.4rem
}
.next-visit{
  padding:1.5rem 0
}
.next-visit h2{
  font-size:2.1rem
}
.recipe-toolbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1.5rem;
  margin-top:2rem
}
.search-box{
  display:flex;
  align-items:center;
  gap:.8rem;
  border:1px solid #9eab9c;
  padding:0 .9rem;
  background:var(--surface);
  border-radius:4px;
  flex:1;
  max-width:30rem
}
.search-box input{
  border:0;
  background:none;
  width:100%;
  padding:.85rem 0;
  min-width:0
}
.recipe-toggle-filters{
  display:flex;
  flex-wrap:wrap;
  gap:1.4rem
}
.recipe-toggle-filters label{
  display:flex;
  align-items:center;
  gap:.4rem;
  font-size:.9375rem
}
.recipe-meal-filters{
  display:flex;
  flex-wrap:wrap;
  gap:.5rem;
  margin:1.8rem 0 .7rem
}
.recipe-meal-filters button{
  padding:.65rem 1rem;
  border:1px solid var(--line);
  background:transparent;
  min-height:44px
}
.recipe-meal-filters [aria-pressed=true]{
  background:var(--ink);
  color:var(--paper);
  border-color:var(--ink)
}
.recipe-count{
  font-size:.875rem;
  color:var(--muted);
  margin:1rem 0
}
.recipe-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.3rem;
  margin-bottom:1.5rem
}
.habits-layout{
  display:grid;
  grid-template-columns:300px 1fr;
  gap:2.6rem;
  margin-top:1rem
}
.habit-score{
  background:var(--studio);
  padding:2rem 1.5rem
}
.habit-score h2{
  font-size:1.8rem;
  text-align:center;
  margin-bottom:.8rem
}
.habit-score>p:not(.small-label){
  text-align:center;
  font-size:.9375rem
}
.week-surface{
  min-width:0
}
.week-toolbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:.5rem;
  margin:1rem 0 1.5rem
}
.week-toolbar h2{
  font:1.2rem var(--sans);
  letter-spacing:0;
  text-align:center
}
.week-bottom{
  display:flex;
  justify-content:space-between;
  gap:1rem;
  margin-top:1.5rem;
  border-top:1px solid var(--line);
  padding-top:1.4rem
}
.week-bottom p{
  max-width:43ch;
  font-size:.9375rem;
  color:var(--muted)
}
.week-bottom .text-link{
  white-space:nowrap
}
.habit-bottom{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1.5rem 3rem;
  margin-top:3rem;
  border-top:1px solid var(--line);
  padding-top:2rem
}
.habit-bottom h2{
  grid-row:span 2;
  font-size:2.2rem
}
.symptom-categories{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:0 3rem;
  margin:2rem 0
}
.self-check{
  display:grid;
  grid-template-columns:1fr 1.25fr;
  gap:4rem;
  border-top:1px solid var(--line);
  padding:2.3rem 0
}
.self-check p{
  margin-top:1.1rem
}
.self-check .eyebrow{
  margin-top:0
}
.self-check h2{
  font-size:2.6rem
}
.self-check .button{
  margin-top:1.2rem
}
.site-footer{
  border-top:1px solid var(--line);
  max-width:calc(var(--max-width) + 2 * var(--gutter));
  padding:2.5rem var(--gutter) 2.2rem;
  margin:auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1.5rem 2rem;
  font-size:.9375rem;
  flex-wrap:wrap;
  background: var(--surface, #fff);
}
.footer-brand{
  display:flex;
  align-items:center;
  gap:1rem
}
.footer-brand .brand-name{
  font-size:2rem
}
.footer-brand p{
  font-size:.75rem;
  letter-spacing:.07em;
  max-width:16ch
}
.site-footer>p{
  max-width:36ch;
  color:var(--muted)
}
.site-footer a, .site-footer button{
  text-decoration:none;
  text-underline-offset:4px;
  padding:.45rem .9rem;
  border-radius:10px;
  border:1px solid var(--control-border, #b3c9d6);
  background:var(--control, #fff);
  color:var(--control-text, #1a4a63);
  font-weight:650;
  transition:all 180ms ease;
}
.site-footer a:hover, .site-footer button:hover{
  background:var(--control-hover, #e8f4fa);
  border-color:var(--action);
  transform:translateY(-1px);
}
.reading-progress{
  position:fixed;
  top:0;
  left:0;
  right:0;
  height:3px;
  z-index:50;
  pointer-events:none
}
.reading-progress span{
  display:block;
  width:100%;
  height:100%;
  background:var(--coral);
  transform:scaleX(0);
  transform-origin:left
}
.filter-section{
  margin:3rem 0;
  padding:2rem;
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:var(--radius)
}
.filter-grid{
  display:grid;
  grid-template-columns:1.25fr 1fr;
  gap:2rem;
  align-items:center
}
.filter-controls h3{
  font-family:var(--serif);
  font-size:2rem;
  font-weight:400;
  margin:1rem 0
}
.filter-controls p{
  margin-bottom:1rem
}
.filter-controls label{
  font-weight:700;
  font-size:.9375rem
}
.range-labels{
  display:flex;
  justify-content:space-between;
  gap:1rem;
  font-size:.875rem;
  color:var(--muted);
  margin-bottom:1rem
}
.stat-grid{
  display:grid;
  grid-template-columns:1.3fr 1fr;
  gap:2rem;
  margin-top:2rem
}
.stats-title{
  max-width:27ch;
  margin-bottom:1rem
}
.stat-cell{
  padding:1.7rem;
  background:var(--studio)
}
.stat-cell:nth-child(2){
  background:var(--coral-soft)
}
.stat-number{
  font-family:var(--serif);
  font-size:clamp(3.5rem,6vw,5.3rem);
  line-height:1.1;
  letter-spacing:-.05em;
  color:var(--ink);
  margin:.75rem 0
}
.stat-provenance{
  border-top:1px solid #b2c3b0;
  padding-top:1rem;
  margin-top:1.1rem;
  font-size:.875rem
}
.stat-provenance p+p{
  margin-top:.25rem
}
.pictogram{
  display:flex;
  gap:.5rem;
  margin:1rem 0
}
.pictogram svg{
  width:22px;
  height:38px;
  color:#718775
}
.pictogram svg.highlight{
  color:var(--ink)
}
.us-comparison{
  padding-top:1.5rem;
  margin-top:1.7rem;
  border-top:1px solid var(--line);
  display:flex;
  align-items:flex-start;
  gap:2rem
}
.us-comparison strong{
  font-size:1.6rem;
  line-height:1.2;
  color:var(--ink);
  white-space:nowrap
}
.us-comparison p{
  font-size:.9375rem
}
@keyframes enter{
  from{
    opacity:0;
    transform:translateY(8px)
  }
  to{
    opacity:1;
    transform:translateY(0)
  }
}
@media(min-width:1600px){
  .discovery-grid{
    gap:6rem
  }
  .kidney-studio{
    padding:1.65rem 2rem
  }
  .discovery-copy h1{
    font-size:5.65rem
  }
}
@media(max-width:1100px){
  .header-inner{
    gap:1.2rem
  }
  #main-nav{
    gap:1rem
  }
  #main-nav a{
    font-size:.9375rem
  }
  .header-tools{
    gap:.3rem
  }
  .brand-name{
    font-size:2rem
  }
  .discovery-grid{
    gap:2rem
  }
  .kidney-studio{
    padding:1.2rem
  }
  .studio-heading .small-label{
    font-size:.75rem;
    letter-spacing:0
  }
  .hero-actions{
    gap:1rem
  }
  .habits-layout{
    grid-template-columns:250px 1fr;
    gap:1.4rem
  }
  .tracking-layout{
    grid-template-columns:2fr 1fr;
    gap:1rem
  }
  .recipe-grid{
    grid-template-columns:repeat(2,1fr)
  }
  .education-regular{
    gap:2rem
  }
  .hero-footnote{
    flex-direction:column;
    gap:.3rem
  }
}
@media(max-width:900px){
  :root{
    --header-height:78px
  }
  .mobile-only{
    display:inline-flex
  }
  .header-inner{
    padding-top:.6rem;
    padding-bottom:.6rem
  }
  #main-nav{
    display:none;
    position:absolute;
    top:100%;
    left:0;
    right:0;
    flex-direction:column;
    align-items:stretch;
    gap:0;
    background:var(--paper);
    border-bottom:1px solid var(--line);
    padding:.7rem var(--gutter)
  }
  #main-nav.open{
    display:flex
  }
  #main-nav a{
    padding:.8rem 0;
    font-size:1rem
  }
  #main-nav a[aria-current=page]::after{
    width:3px;
    top:.4rem;
    bottom:.4rem;
    right:auto;
    left:-.7rem;
    height:auto
  }
  .discovery-grid{
    grid-template-columns:1fr 1fr;
    gap:1.7rem
  }
  .studio-heading{
    flex-direction:column;
    gap:.3rem
  }
  .discovery-copy h1{
    font-size:3.15rem
  }
  .hero-description{
    font-size:1rem
  }
  .hero-message{
    margin-top:1.4rem;
    padding-top:1rem
  }
  .hero-footnote{
    display:none
  }
  .part-buttons{
    gap:.25rem
  }
  .part-buttons button{
    font-size:.8rem
  }
  .tracking-layout{
    grid-template-columns:1fr
  }
  .tracking-aside{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:1rem;
    padding:1.3rem .5rem
  }
  .tracking-aside .eyebrow{
    grid-column:1/-1;
    margin:0
  }
  .tracking-aside h2{
    grid-row:span 2
  }
  .tracking-aside .aside-rule{
    display:none
  }
  .tracking-aside .local-label{
    margin:0
  }
  .recipe-toolbar{
    align-items:stretch;
    flex-direction:column;
    gap:1rem
  }
  .search-box{
    max-width:none
  }
  .habits-layout{
    grid-template-columns:1fr
  }
  .habit-score{
    display:grid;
    grid-template-columns:170px 1fr;
    gap:.4rem 1.5rem;
    padding:1.3rem
  }
  .habit-score>.small-label{
    grid-column:1/-1
  }
  .habit-score .progress-orbit{
    grid-row:span 4;
    margin:0
  }
  .habit-score h2,.habit-score>p:not(.small-label){
    text-align:left
  }
  .habit-score .streak-box{
    margin:.3rem 0;
    padding:.7rem 0
  }
  .habit-bottom{
    gap:1.4rem
  }
  .self-check{
    gap:2rem
  }
  .footer-brand{
    display:block
  }
  .footer-brand p{
    margin-top:.5rem
  }
  .site-footer{
    gap:1.2rem
  }
  .topline-note{
    display:none
  }
}
@media(max-width:640px){
  .section-topline{
    padding:1.3rem 0
  }
  .discovery-grid{
    display:flex;
    flex-direction:column;
    gap:1.6rem;
    align-items:stretch
  }
  .discovery-copy{
    order:-1;
    padding:.5rem 0
  }
  .discovery-copy h1{
    font-size:clamp(2.85rem,12vw,4rem)
  }
  .hero-description{
    margin-top:1.1rem;
    font-size:1.1rem
  }
  .hero-actions{
    margin-top:1.3rem
  }
  .hero-message{
    margin-top:1.3rem
  }
  .hero-footnote{
    display:none
  }
  .kidney-studio{
    padding:1rem 1.3rem
  }
  .studio-heading{
    flex-direction:row
  }
  .studio-heading .small-label{
    font-size:.75rem
  }
  .kidney-visual{
    aspect-ratio:1.2;
    max-height:320px
  }
  .studio-caption{
    min-height:105px
  }
  .part-buttons button{
    font-size:.875rem
  }
  .education-section{
    margin-top:2.4rem
  }
  .section-heading{
    align-items:flex-start
  }
  .section-heading>.small-label{
    display:none
  }
  .education-tabs{
    grid-template-columns:1fr 1fr
  }
  .education-tabs button{
    padding:1rem .6rem;
    gap:.5rem;
    font-size:.9375rem
  }
  .education-regular{
    grid-template-columns:1fr;
    gap:1.5rem
  }
  .education-regular h2{
    max-width:none
  }
  .education-panel{
    padding:1.7rem 0
  }
  .discovery-bottom{
    grid-template-columns:1fr;
    gap:.8rem;
    margin-top:2rem
  }
  .daily-note{
    padding:1.8rem
  }
  .mini-tracking{
    padding:1.7rem .3rem
  }
  .page-shell{
    padding-bottom:3rem
  }
  .page-intro{
    padding:2.1rem 0 1.6rem;
    flex-direction:column;
    align-items:flex-start;
    gap:1.3rem
  }
  .page-intro h1{
    font-size:2.85rem
  }
  .page-intro p:not(.eyebrow){
    font-size:1rem
  }
  .large-index{
    display:none
  }
  .data-mode-bar{
    align-items:flex-start
  }
  .data-mode-bar>div{
    align-items:flex-start;
    flex-direction:column;
    gap:.5rem
  }
  .data-mode-bar>button{
    font-size:.9375rem;
    flex-shrink:0
  }
  .chart-surface{
    padding:1.2rem
  }
  .tracking-aside{
    display:block;
    padding:1.3rem .3rem
  }
  .tracking-aside h2{
    margin:.8rem 0
  }
  .tracking-aside p{
    margin:.8rem 0
  }
  .tracking-aside .local-label{
    margin-top:1rem
  }
  .results-section{
    margin-top:1.7rem
  }
  .results-section .section-heading{
    flex-direction:column;
    gap:1.2rem
  }
  .table-actions{
    gap:1rem;
    flex-wrap:wrap
  }
  .support-grid{
    grid-template-columns:1fr;
    gap:.5rem
  }
  .food-teaser{
    padding:1.6rem
  }
  .next-visit{
    padding:1.3rem .2rem
  }
  .food-notice{
    padding:1.1rem;
    font-size:.9375rem
  }
  .recipe-toggle-filters{
    gap:1rem
  }
  .recipe-grid{
    grid-template-columns:1fr;
    gap:1rem
  }
  .recipe-meal-filters{
    gap:.4rem
  }
  .recipe-meal-filters button{
    padding:.5rem .7rem;
    font-size:.9375rem
  }
  .habit-score{
    grid-template-columns:120px 1fr;
    gap:.5rem 1rem
  }
  .habit-score h2{
    font-size:1.55rem
  }
  .habit-score .progress-orbit strong{
    font-size:2.2rem
  }
  .habit-score .fine-print{
    grid-column:1/-1
  }
  .week-toolbar h2{
    font-size:1.05rem
  }
  .week-bottom{
    flex-direction:column;
    gap:.4rem
  }
  .habit-bottom{
    grid-template-columns:1fr
  }
  .habit-bottom h2{
    grid-row:auto
  }
  .symptom-categories{
    grid-template-columns:1fr;
    margin-top:1rem
  }
  .self-check{
    grid-template-columns:1fr;
    gap:1.5rem;
    padding-top:1.8rem
  }
  .self-check h2{
    font-size:2.2rem
  }
  .site-footer{
    flex-direction:column;
    align-items:flex-start;
    padding-top:1.7rem;
    padding-bottom:1.7rem;
    gap:1rem
  }
  .footer-brand{
    display:flex;
    align-items:center;
    gap:1rem
  }
  .footer-brand p{
    margin:0
  }
  .filter-section{
    padding:1.3rem;
    margin:2rem 0
  }
  .filter-grid{
    grid-template-columns:1fr;
    gap:1rem
  }
  .filter-section h2{
    font-size:2rem
  }
  .filter-controls h3{
    font-size:1.7rem
  }
  .stat-grid{
    grid-template-columns:1fr;
    gap:1rem
  }
  .stat-cell{
    padding:1.4rem
  }
  .us-comparison{
    flex-direction:column;
    gap:.8rem
  }
  .hero-actions .button{
    padding:.85rem 1rem
  }
  .hero-actions .text-link{
    font-size:.9375rem
  }
}
@media print{
  .site-header,.site-footer,.button,.text-link,.header-tools{
    display:none
  }
  body{
    background:white
  }
  .route[hidden]{
    display:none!important
  }
  .page-shell{
    padding:0
  }
  .chart-surface,.kidney-studio,.notice{
    break-inside:avoid
  }
  .presentation-dialog{
    position:static!important;
    border:0
  }
  .presentation-controls,.presentation-hint,.presentation-top{
    display:none
  }
}

}
````

## css/tokens.css

````css
/* Identidad visual: cambia estos valores para ajustar toda la aplicación. */ @font-face{
  font-family:RenalEditorial;
  src:url('../assets/fonts/editorial.woff2') format('woff2');
  font-weight:400;
  font-style:normal;
  font-display:swap
}
@font-face{
  font-family:RenalEditorial;
  src:url('../assets/fonts/editorial-italic.woff2') format('woff2');
  font-weight:400;
  font-style:italic;
  font-display:swap
}
@font-face{
  font-family:RenalText;
  src:url('../assets/fonts/texto.woff2') format('woff2');
  font-weight:400;
  font-display:swap
}
@font-face{
  font-family:RenalText;
  src:url('../assets/fonts/texto-bold.woff2') format('woff2');
  font-weight:600 900;
  font-display:swap
}
:root{
  color-scheme:light;
  --paper:#f5f7f9;
  --surface:#ffffff;
  --studio:#edf4f8;
  --sage:#dbeaf1;
  --sage-dark:#52758a;
  --ink:#203442;
  --text:#40525f;
  --muted:#5b6d7b;
  --line:#dfe6ec;
  --coral:#a65040;
  --coral-soft:#faeee8;
  --blue:#146d88;
  --blue-soft:#edf4f8;
  --amber:#805917;
  --amber-soft:#fff8eb;
  --warning-line:#e7d5b3;
  --green-soft:#e9f4ee;
  --green:#28634d;
  --danger:#a83c38;
  --danger-action:#a23935;
  --danger-soft:#fff4f3;
  --danger-line:#e5c5c2;
  --action:#146d88;
  --action-hover:#0d526b;
  --action-text:#ffffff;
  --control:#ffffff;
  --control-hover:#edf4f8;
  --control-border:#b4c3ce;
  --control-active:#e8f2f8;
  --control-text:#285268;
  --input-border:#8195a5;
  --focus:#146d88;
  --card-shadow:0 3px 14px rgb(20 45 64 / 3%);
  --recipe-breakfast:#f6efdf;
  --recipe-lunch:#edf3e9;
  --recipe-dinner:#eaf1f7;
  --recipe-snack:#f6ece8;
  --serif:RenalEditorial,Palatino,'Book Antiqua',Georgia,serif;
  --sans:RenalText,'Segoe UI',Arial,sans-serif;
  --radius:18px;
  --ease:cubic-bezier(.2,.7,.2,1);
  --max-width:1240px;
  --gutter:clamp(1rem,4vw,4rem);
  --header-height:84px
}
/* Tema oscuro con colores propios, sin invertir las ilustraciones. */
[data-theme="dark"]{
  color-scheme:dark;
  --paper:#141e27;--surface:#1d2b36;--studio:#243743;
  --sage:#344e5e;--sage-dark:#a2bed0;--ink:#edf3f7;--text:#d2dee7;
  --muted:#afc0ce;--line:#3c505f;--coral:#efa88c;--coral-soft:#44342e;
  --blue:#8dccdf;--blue-soft:#243743;--amber:#edca88;--amber-soft:#3b3324;
  --warning-line:#635237;--green:#b0d9bf;--green-soft:#263f35;
  --danger:#ffb4ad;--danger-soft:#422f32;--danger-line:#715051;
  --action:#8dccdf;--action-hover:#b1deec;--action-text:#18313f;
  --control:#1d2b36;--control-hover:#2a4050;--control-border:#5b7588;
  --control-active:#2b4354;--control-text:#c3e3f1;--input-border:#7693a5;
  --focus:#8dccdf;--card-shadow:0 3px 16px rgb(0 0 0 / 10%);
  --recipe-breakfast:#363528;--recipe-lunch:#2b3b30;
  --recipe-dinner:#283b4b;--recipe-snack:#3d3332
}
````

## css/visual.css

````css
/* Renal 3.3 · Sistema visual de las seis secciones.
   Las hojas anteriores son capas de respaldo; esta hoja tiene prioridad.
   Colores en tokens.css. Ningún parche visual necesita !important. */
html { scroll-padding-top: 10rem; }
body { background: var(--paper); color: var(--text); }
h1, h2, h3, .recipe-title, .empty-state h3, .filter-controls h3, .glomerulus-surface h3 { font-family: var(--sans); font-weight: 700; }
h1 { font-size: clamp(2.35rem, 4.1vw, 3.6rem); line-height: 1.13; letter-spacing: -.045em; }
h2 { font-size: clamp(1.65rem, 2.4vw, 2.25rem); line-height: 1.2; letter-spacing: -.035em; }
h3 { letter-spacing: -.015em; }
em { font-family: inherit; font-weight: inherit; }
.eyebrow { background: none; border: 0; padding: 0; color: var(--action); font-size: .75rem; font-weight: 700; letter-spacing: .1em; line-height: 1.5; margin-bottom: .75rem; }
.small-label { color: var(--muted); font-size: .75rem; letter-spacing: .07em; }
.fine-print, .medical-source { color: var(--muted); }
.tag, .status-badge { border-radius: 7px; font-size: .75rem; font-weight: 600; padding: .35rem .65rem; }
.tag { color: var(--muted); background: var(--paper); border-color: var(--line); }
.demo-tag { background: var(--amber-soft); color: var(--amber); border-color: var(--warning-line); }
.danger-text { color: var(--danger); }
::selection { background: var(--sage); color: var(--ink); }

/* Acciones con espacio, contraste y respuesta al pulsar. */
.button, .text-link, .site-footer > a {
  display: inline-flex; align-items: center; justify-content: center; gap: .6rem;
  min-height: 44px; padding: .7rem 1rem; border: 1px solid var(--control-border);
  border-radius: 10px; background: var(--control); color: var(--control-text);
  font: 600 .9375rem/1.35 var(--sans); text-decoration: none; letter-spacing: 0;
  box-shadow: 0 1px 2px rgb(20 45 64 / 3%); cursor: pointer;
  transition: background 160ms var(--ease), border-color 160ms var(--ease), box-shadow 160ms var(--ease), transform 160ms var(--ease);
}
.button.primary { background: var(--action); color: var(--action-text); border-color: var(--action); }
.button.secondary { background: var(--control); color: var(--control-text); border-color: var(--control-border); }
.button.danger { background: var(--danger-action); color: #fff; border-color: var(--danger-action); }
.text-link.danger-text { background: var(--danger-soft); color: var(--danger); border-color: var(--danger-line); }
.button.primary::before { content: none; }
.icon-button, .favorite-button {
  display: inline-flex; align-items: center; justify-content: center;
  width: 42px; height: 42px; min-width: 42px; min-height: 42px; padding: 0;
  border: 1px solid var(--line); border-radius: 10px; background: var(--surface); color: var(--ink);
  transition: background 160ms var(--ease), border-color 160ms var(--ease), transform 160ms var(--ease);
}
.favorite-button { border-radius: 50%; }
.favorite-button[aria-pressed="true"] { background: var(--coral-soft); color: var(--coral); border-color: var(--coral); }
.icon-button[aria-pressed="true"] { background: var(--control-active); color: var(--action); border-color: var(--action); }
.button:active, .text-link:active, .icon-button:active { transform: translateY(1px); }
.button:disabled, .icon-button:disabled, .text-link:disabled { transform: none; box-shadow: none; }
:is(button, a, input, select, textarea, [tabindex]):focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
.button:has(.file-input:focus-visible) { outline: 3px solid var(--focus); outline-offset: 3px; }
.hero-actions a::after, .daily-note > a::after, .mini-tracking > a::after, .food-teaser > a::after, [data-open-recipe]::after { content: "→"; font-size: 1.15em; transition: transform 160ms var(--ease); }
@media (hover: hover) and (pointer: fine) {
  .button:hover, .text-link:hover, .site-footer > a:hover { background: var(--control-hover); border-color: var(--action); transform: translateY(-2px); box-shadow: 0 5px 12px rgb(20 45 64 / 9%); }
  .button.primary:hover { background: var(--action-hover); color: var(--action-text); border-color: var(--action-hover); }
  .button.danger:hover { background: var(--danger-action); color: #fff; }
  .text-link.danger-text:hover { color: var(--danger); border-color: var(--danger); background: var(--danger-soft); }
  .icon-button:hover, .favorite-button:hover { background: var(--control-hover); border-color: var(--action); transform: translateY(-1px); }
  .hero-actions a:hover::after, .daily-note > a:hover::after, .mini-tracking > a:hover::after, [data-open-recipe]:hover::after { transform: translateX(3px); }
}

/* Campos comunes, incluidos búsqueda, ajustes y formularios. */
:where(input:not([type=checkbox]):not([type=radio]):not([type=range]):not(.file-input), select, textarea) {
  background: var(--surface); color: var(--ink); border: 1px solid var(--input-border);
  border-radius: 9px; min-height: 44px; padding: .65rem .8rem;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
input[type=checkbox], input[type=radio], input[type=range] { accent-color: var(--action); }
input[type=checkbox], input[type=radio] { width: 18px; height: 18px; flex-shrink: 0; }
.form-field > span:first-child { font-weight: 600; color: var(--ink); }
.field-hint { color: var(--muted); }
fieldset { min-inline-size: 0; border-color: var(--line); border-radius: 12px; }
.checkbox-control { gap: .65rem; min-height: 40px; }
.search-box { border: 1px solid var(--input-border); border-radius: 11px; color: var(--muted); }
.search-box input { border: 0; box-shadow: none; background: transparent; padding-left: 0; }
.search-box:focus-within { outline: 3px solid var(--focus); outline-offset: 3px; }
.search-box input:focus-visible { outline: none; }

/* Navegación compacta, sin bloques altos. */
.site-header { background: var(--surface); border-top: 0; border-bottom: 1px solid var(--line); box-shadow: 0 3px 16px rgb(20 45 64 / 3%); }
.header-inner { min-height: 84px; gap: 1.2rem; flex-wrap: wrap; }
.brand { color: var(--action); gap: .55rem; }
.brand-name { font-family: var(--serif); font-size: 2.2rem; font-weight: 400; }
.brand-project { font-size: .65rem; letter-spacing: .1em; color: var(--muted); }
.header-tools { gap: .35rem; flex-wrap: wrap; }
.header-tools .icon-button { width: 36px; height: 38px; min-width: 36px; min-height: 38px; font-size: 1.4rem; border-color: transparent; background: transparent; }
.mobile-only { display: none; }
#theme-toggle { font-size: 23px; }
#main-nav { display: flex; gap: .35rem; }
#main-nav a { display: flex; align-items: center; justify-content: center; gap: .45rem; padding: .65rem .85rem; min-height: 44px; border: 1px solid var(--line); border-radius: 10px; font-size: .875rem; font-weight: 600; color: var(--text); white-space: nowrap; background: var(--surface); transition: background 160ms ease, border-color 160ms ease, transform 160ms ease; }
#main-nav a svg { width: 17px; height: 17px; flex-shrink: 0; }
#main-nav a[aria-current="page"] { background: var(--action); color: var(--action-text); border-color: var(--action); box-shadow: 0 2px 4px rgb(20 45 64 / 8%); }
#main-nav a[aria-current="page"]::after { content: none; }
#main-nav a:hover { border-color: var(--action); transform: translateY(-1px); }
.language-control { border: 1px solid var(--line); border-radius: 9px; padding: 3px; gap: 2px; }
.language-control button { min-height: 30px; padding: .3rem .4rem; border-radius: 6px; font-size: .75rem; color: var(--muted); }
.language-control [aria-pressed="true"] { background: var(--control-active); color: var(--action); font-weight: 700; }
.workspace-strip { min-height: 46px; gap: .9rem; padding-top: .4rem; padding-bottom: .4rem; border-top-color: var(--line); }
.workspace-strip .text-link { min-height: 32px; padding: .35rem .65rem; font-size: .75rem; border-color: var(--line); box-shadow: none; }
.profile-select select { min-height: 32px; padding: .3rem .6rem; font-size: .8rem; }
.reading-progress span { background: var(--action); }

/* Superficies con bordes neutros y una escala única de espacios. */
.page-shell { padding-bottom: 3.5rem; }
.page-intro { margin: 2rem 0 1.75rem; padding: 2rem 2.25rem; background: var(--surface); border: 1px solid var(--line); border-radius: 20px; align-items: center; gap: 1.5rem; position: relative; }
.page-intro > div { max-width: 48rem; }
.page-intro p:not(.eyebrow) { font-size: 1.05rem; margin-top: .85rem; color: var(--muted); max-width: 60ch; }
.page-intro h1 { max-width: 25ch; }
.intro-symbol, .card-symbol { display: grid; place-items: center; flex-shrink: 0; width: 64px; height: 64px; background: var(--studio); border-radius: 18px; color: var(--action); }
.intro-symbol svg { width: 34px; height: 34px; }
.card-symbol { width: 48px; height: 48px; border-radius: 14px; margin-bottom: 1.25rem; }
.card-symbol svg { width: 25px; height: 25px; }
.section-heading { align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.4rem; }
.section-heading .eyebrow { margin-bottom: .4rem; }
.section-heading h2 { margin: 0; }
.recipe-card, .chart-surface, .week-surface, .habit-score, .note-surface, .streak-surface, .education-panel, .results-section, .filter-section, .shopping-surface, .anatomy-comparison, .glomerulus-surface, .tracking-aside, .daily-note, .mini-tracking, .food-teaser, .next-visit, .habit-bottom, .symptom-category, .self-check, .credit-block, .universities, .sources-section { background: var(--surface); border: 1px solid var(--line); border-radius: 18px; box-shadow: var(--card-shadow); }
.chart-surface, .week-surface, .habit-score, .note-surface, .streak-surface, .education-panel, .results-section, .filter-section, .shopping-surface, .anatomy-comparison, .tracking-aside, .daily-note, .mini-tracking, .food-teaser, .next-visit, .habit-bottom, .symptom-category, .self-check, .credit-block, .universities, .sources-section { padding: 1.75rem; }
.notice, .early-detection, .source-pending, .chapter-note, .recipe-detail-note { background: var(--studio); border: 1px solid var(--line); border-radius: 12px; color: var(--text); padding: 1.2rem 1.4rem; }
.notice { background: var(--amber-soft); border-color: var(--warning-line); }
.notice > span { color: var(--amber); }
.source-pending { background: var(--amber-soft); border-color: var(--warning-line); }
.empty-state { padding: 2.5rem 1.2rem; }
.empty-state h3 { font-size: 1.45rem; }
.empty-state p { font-size: .9375rem; }

/* Descubrir: presentación, anatomía y lectura. */
.section-topline { padding: 1.7rem 0 1.1rem; font-size: .75rem; letter-spacing: .08em; }
.discovery-grid { grid-template-columns: 1.03fr 1fr; gap: 3rem; align-items: center; }
.discovery-copy { padding: 1rem 0; }
.discovery-copy h1 { font-family: var(--sans); font-size: clamp(2.7rem, 4.3vw, 4.15rem); line-height: 1.1; letter-spacing: -.045em; font-weight: 700; }
.discovery-copy h1 em { color: var(--action); font-style: normal; }
.hero-description { font-size: 1.125rem; color: var(--muted); margin-top: 1.25rem; max-width: 46ch; }
.hero-actions { gap: .75rem; margin-top: 1.6rem; }
.hero-message { margin-top: 1.6rem; padding: 1.1rem 1.2rem; background: var(--studio); border: 1px solid var(--line); border-radius: 12px; font-size: .9375rem; }
.message-symbol { color: var(--action); }
.hero-footnote { margin-top: 1.1rem; font-size: .8125rem; }
.kidney-studio { background: var(--surface); border: 1px solid var(--line); border-radius: 20px; padding: 1.4rem 1.5rem; box-shadow: var(--card-shadow); }
.studio-heading { flex-direction: row; gap: 1rem; }
.studio-caption { border-color: var(--line); min-height: 102px; }
.studio-caption h2 { font: 700 1.1rem/1.4 var(--sans); letter-spacing: -.01em; margin-bottom: .35rem; }
.studio-caption p { color: var(--muted); }
.caption-index { background: var(--studio); border-color: var(--line); color: var(--action); }
.kidney-label { fill: var(--muted); }
.kidney-label-line { stroke: var(--input-border); }
.part-buttons { min-height: 0; margin-top: .85rem; gap: .45rem; }
.studio-tools { padding-top: 1rem; min-height: 0; gap: .5rem; }
.studio-tools .text-link { font-size: .8125rem; padding: .55rem .75rem; min-height: 40px; }
.concept-section { border: 0; padding-top: 0; margin-top: 2.75rem; }
.concept-section h2 { font-size: clamp(1.65rem, 2.4vw, 2.25rem); }
.concept-layout { grid-template-columns: 1.4fr 1fr; gap: 1.5rem; }
.specimen-compare { border-radius: 18px; background: var(--studio); }
.specimen-before, .specimen-after { background: var(--studio); }
.specimen-label { border-radius: 7px; padding: .4rem .7rem; }
.specimen-divider > span { background: var(--surface); border-radius: 50%; color: var(--action); }
.glomerulus-surface { padding: 1.5rem; }
.glomerulus-surface h3 { font-size: 1.5rem; line-height: 1.25; }
.glomerulus-surface .fine-print { font-size: .8125rem; }
.part-comparison-grid article { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }
.part-comparison-grid article:nth-child(2) { background: var(--studio); }
.large-part-index { font-family: var(--sans); font-size: 2rem; font-weight: 700; color: var(--action); }
.education-section { margin-top: 2.75rem; }
.education-tabs { gap: .6rem; border: 0; margin-bottom: 1rem; }
.education-tabs button { padding: 1rem; gap: .7rem; }
.education-tabs button > span:first-child { color: currentColor; opacity: .75; }
.education-tabs [aria-selected="true"]::after { content: none; }
.education-regular { gap: 2.25rem; }
.education-regular h2 { max-width: 22ch; }
.education-regular .chapter-description { font-size: 1rem; color: var(--muted); }
.chapter-points h3 { font-size: 1.05rem; }
.chapter-points li { font-size: .9375rem; padding-top: .85rem; padding-bottom: .85rem; }
.chapter-points li::before { color: var(--action); top: .95rem; }
.chapter-note { margin-top: 1.4rem; font-size: .9375rem; }
.chapter-sources { gap: .6rem 1.2rem; }
.chapter-sources a { color: var(--action); line-height: 1.5; }
.stat-cell { background: var(--studio); border: 1px solid var(--line); border-radius: 12px; }
.stat-cell:nth-child(2) { background: var(--amber-soft); }
.stat-number { font-family: var(--sans); font-weight: 700; font-size: 3.4rem; }
.discovery-bottom { margin-top: 1.5rem; gap: 1.5rem; align-items: stretch; }
.daily-note { background: var(--surface); color: var(--text); }
.daily-note h2 { color: var(--ink); max-width: 24ch; }
.daily-note .eyebrow { color: var(--action); }
.daily-note p:not(.eyebrow) { margin: .9rem 0 1.4rem; color: var(--muted); }
.daily-note .primary { background: var(--action); color: var(--action-text); }
.mini-tracking { display: flex; flex-direction: column; align-items: flex-start; }
.mini-tracking > .eyebrow { margin-bottom: 1rem; }
.mini-tracking #home-tracking { width: 100%; flex: 1; }
.mini-tracking > .text-link { margin-top: 1.2rem; }
.mini-result-grid { gap: .8rem; margin-top: 1rem; }
.mini-result-grid > div { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 1rem; }
.mini-result-grid strong { font-family: var(--sans); font-weight: 700; color: var(--action); font-size: 2.25rem; }
.mini-result-grid small { font-size: .75rem; }

/* Grupos de elección: pestañas, periodos y filtros. */
.education-tabs button, .part-buttons button, .concept-timeline button, .recipe-meal-filters button, .period-control button, .segmented button, .welcome-choices button, .month-habit-list button { min-height: 42px; padding: .65rem .85rem; border: 1px solid var(--line); border-radius: 10px; background: var(--surface); color: var(--text); font: 600 .875rem/1.4 var(--sans); transition: background 160ms ease, border-color 160ms ease, transform 160ms ease; }
.education-tabs [aria-selected="true"], .part-buttons [aria-pressed="true"], .concept-timeline [aria-pressed="true"], .recipe-meal-filters [aria-pressed="true"], .period-control [aria-pressed="true"], .segmented [aria-pressed="true"], .welcome-choices [aria-pressed="true"], .month-habit-list [aria-pressed="true"] { background: var(--control-active); color: var(--action); border-color: var(--action); box-shadow: none; }
.education-tabs button:hover, .part-buttons button:hover, .concept-timeline button:hover, .recipe-meal-filters button:hover, .period-control button:hover, .segmented button:hover, .welcome-choices button:hover, .month-habit-list button:hover { border-color: var(--action); }
.concept-timeline { gap: .5rem; flex-wrap: wrap; }
.concept-timeline button { flex: 1; font-size: .75rem; padding: .55rem .65rem; }
.part-buttons button { font-size: .8125rem; }
.period-control, .segmented { gap: .3rem; padding: .3rem; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }
.period-control button { min-height: 34px; padding: .4rem .65rem; font-size: .8125rem; border-color: transparent; background: transparent; }

/* Seguimiento: herramientas, gráficos, tablas y comparaciones. */
.data-mode-bar { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: .85rem 1.1rem; margin-bottom: 1rem; }
.data-mode-bar > div { gap: .75rem; flex-wrap: wrap; }
.data-mode-bar.personal .demo-tag { background: var(--studio); color: var(--action); border-color: var(--line); }
.data-mode-bar .text-link { min-height: 38px; padding: .5rem .75rem; font-size: .8125rem; }
.tracking-tools { border: 0; margin: 0 0 1.5rem; padding: 0; gap: .65rem; }
.tracking-tools .button, .tracking-tools .text-link { min-height: 42px; padding: .6rem .85rem; font-size: .875rem; }
.tracking-tools > .checkbox-control { margin-right: auto; }
.tracking-layout { grid-template-columns: minmax(0, 2.15fr) minmax(0, 1fr); gap: 1.5rem; align-items: stretch; }
.chart-toolbar { gap: 1rem; flex-wrap: wrap; }
.chart-toolbar h2 { font-size: 1.35rem; letter-spacing: -.025em; }
.metric-summary strong { color: var(--action); font-size: 3rem; font-weight: 700; }
.metric-summary { margin-top: 1.6rem; }
.chart-svg text { fill: var(--muted); }
.chart-svg .chart-gridline { stroke: var(--line); }
.chart-footer { gap: .75rem; flex-wrap: wrap; }
.chart-footer select { max-width: 100%; }
.tracking-aside { display: flex; flex-direction: column; gap: .8rem; }
.tracking-aside .eyebrow { margin: 0; }
.tracking-aside h2 { font-size: 1.75rem; margin: 0; }
.tracking-aside p { font-size: .9375rem; color: var(--muted); }
.tracking-aside .aside-rule { margin: .25rem 0; }
.tracking-aside .text-link { align-self: flex-start; font-size: .8125rem; margin: .3rem 0 0; }
.tracking-aside .local-label { margin-top: auto; padding-top: .8rem; font-size: .75rem; }
.results-section { margin-top: 1.5rem; }
.table-actions { gap: .55rem; }
.table-actions .button, .table-actions .text-link { font-size: .8125rem; min-height: 40px; padding: .55rem .8rem; }
.date-filters { background: var(--paper); padding: 1rem; border: 1px solid var(--line); border-radius: 12px; margin-bottom: 1.2rem; }
.date-filters label { flex: 1 1 10rem; }
.date-filters input { min-width: 0; }
.results-table th { background: var(--paper); color: var(--muted); font-weight: 600; }
.results-table tr:hover td { background: var(--studio); }
.comparison-surface { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; margin: 1.5rem 0; padding: 1.25rem; }
.comparison-surface h3 { line-height: 1.5; font-size: .9375rem; }
.professional-field { max-width: none; }
.support-grid { gap: 1.5rem; margin-top: 1.5rem; }
.food-teaser p:not(.eyebrow) { color: var(--muted); }
.next-visit h2 { font-size: 1.85rem; }
.next-visit li { font-size: .9375rem; }

/* Alimentación: ilustraciones vectoriales locales y tarjetas completas. */
.recipe-toolbar { margin-top: 1.5rem; gap: 1rem; flex-wrap: wrap; }
.recipe-toggle-filters { gap: .8rem 1.2rem; }
.recipe-toggle-filters label { font-size: .875rem; padding: .35rem 0; }
.recipe-meal-filters { gap: .5rem; margin: 1.25rem 0 .75rem; }
.recipe-count { font-size: .8125rem; }
.recipe-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.recipe-card { padding: 0; overflow: hidden; min-height: 0; transition: border-color 160ms ease, box-shadow 160ms ease; }
.recipe-card:hover { border-color: var(--input-border); box-shadow: 0 6px 20px rgb(20 45 64 / 7%); }
.recipe-visual { display: flex; align-items: center; justify-content: center; height: 150px; padding: .75rem; background: var(--studio); position: relative; border-bottom: 1px solid var(--line); }
.recipe-visual[data-meal="breakfast"] { background: var(--recipe-breakfast); }
.recipe-visual[data-meal="lunch"] { background: var(--recipe-lunch); }
.recipe-visual[data-meal="dinner"] { background: var(--recipe-dinner); }
.recipe-visual[data-meal="snack"] { background: var(--recipe-snack); }
.recipe-visual > svg { height: 120px; width: 170px; }
.recipe-number { position: absolute; top: .75rem; left: .85rem; font: 600 .75rem/1 var(--sans); color: var(--muted); background: var(--surface); border: 1px solid var(--line); border-radius: 6px; padding: .4rem; }
.recipe-card-content { display: flex; flex: 1; flex-direction: column; padding: 1.25rem; }
.recipe-meta { font-size: .75rem; margin-bottom: .75rem; }
.recipe-title { font-size: 1.35rem; line-height: 1.25; letter-spacing: -.025em; max-width: none; }
.recipe-summary { margin: .8rem 0 1.1rem; font-size: .875rem; }
.recipe-card-bottom { padding-top: .9rem; }
.recipe-card-bottom .text-link { font-size: .8125rem; padding: .55rem .75rem; min-height: 40px; }
.recipe-validation { color: var(--muted); font-size: .6875rem; line-height: 1.6; letter-spacing: .04em; margin-top: .9rem; padding: 0; background: none; }
.shopping-surface { margin-top: 1.5rem; }
.shopping-surface .section-heading { padding-bottom: 1rem; border-bottom: 1px solid var(--line); }
.shopping-surface .tool-row { gap: .55rem; }
.shopping-surface ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 1.5rem; padding: 0; margin: 1rem 0; columns: 1; list-style: none; }
.shopping-surface li { display: flex; align-items: center; gap: .75rem; padding: .8rem 0; border-bottom: 1px solid var(--line); margin: 0; }
.shopping-heading { display: flex; align-items: center; gap: 1rem; }
.shopping-heading .card-symbol { margin: 0; }
.shopping-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--action); flex-shrink: 0; }
.shopping-empty { display: flex; align-items: center; gap: 1rem; padding: 1.2rem 0; }
.shopping-empty .card-symbol { margin: 0; }
.shopping-empty strong { display: block; color: var(--ink); margin-bottom: .35rem; }
.shopping-empty p { color: var(--muted); font-size: .875rem; }
.shopping-count { display: inline-flex; align-items: center; justify-content: center; min-width: 28px; min-height: 28px; padding: .2rem .5rem; font-size: .75rem; color: var(--action); border-radius: 8px; background: var(--control-active); }

/* Hábitos: progreso, calendario y notas. */
.habits-layout { grid-template-columns: minmax(240px, 290px) minmax(0, 1fr); gap: 1.5rem; margin-top: 0; }
.habit-score { background: var(--surface); }
.habit-score h2 { font-size: 1.5rem; }
.progress-orbit { max-width: 180px; }
.progress-orbit strong { font-size: 3rem; font-weight: 700; color: var(--action); }
.orbit-track { stroke: var(--line); }
.orbit-value { stroke: var(--action); }
.streak-box { border-color: var(--line); }
.streak-box strong { font-family: var(--sans); font-weight: 700; font-size: 2rem; color: var(--action); }
.week-toolbar { margin: 1.2rem 0; }
.week-toolbar h2 { font: 600 1.1rem/1.5 var(--sans); }
.calendar-view-toolbar { gap: .65rem; }
.calendar-view-toolbar .text-link { font-size: .75rem; min-height: 40px; padding: .5rem .7rem; }
.habit-grid { grid-template-columns: minmax(130px, 1.6fr) repeat(7, minmax(32px, 1fr)); }
.habit-label { font-size: .875rem; }
.habit-check { border: 1px solid var(--input-border); border-radius: 9px; background: var(--surface); color: var(--action); width: 34px; height: 34px; transition: background 160ms ease, transform 160ms ease; }
.habit-check[aria-pressed="true"] { background: var(--action); border-color: var(--action); color: var(--action-text); }
.habit-check:hover:not(:disabled) { background: var(--control-active); color: var(--action); transform: scale(1.06); }
.habit-check[aria-pressed="true"]:hover { background: var(--action-hover); color: var(--action-text); }
.habit-day-heading.today strong { background: var(--action); color: var(--action-text); border-radius: 8px; }
.week-bottom { align-items: flex-start; }
.week-bottom .text-link { white-space: normal; font-size: .8125rem; flex-shrink: 0; }
.month-day { background: var(--paper); border-radius: 9px; }
.month-day.today { border-color: var(--action); }
.month-day[aria-pressed="true"] { background: var(--control-active); outline-color: var(--action); }
.month-day-detail { border: 1px solid var(--line); border-radius: 12px; background: var(--paper); }
.habit-detail-tools { gap: 1.5rem; margin-top: 1.5rem; }
.habit-detail-tools h2 { font-size: 1.6rem; }
.habit-streaks strong { white-space: normal; text-align: right; }
.habit-bottom { gap: 1rem 2rem; margin-top: 1.5rem; }
.habit-bottom h2 { font-size: 1.9rem; }
.habit-bottom .text-link { justify-self: start; }

/* Señales y proyecto: lectura y orientación diferenciadas. */
.early-detection { gap: 1.5rem; align-items: flex-start; }
.early-detection strong { font-size: 1.05rem; max-width: 25ch; }
.early-detection p { font-size: .9375rem; color: var(--muted); }
.symptom-categories { gap: 1.25rem; margin: 1.5rem 0; }
.symptom-category .small-label, .credit-block > span { display: inline-flex; align-items: center; justify-content: center; background: var(--studio); color: var(--action); border-radius: 9px; width: 36px; height: 36px; font: 600 .8125rem var(--sans); }
.symptom-category h2 { font-size: 1.6rem; margin-top: 1rem; }
.symptom-category li { font-size: .9375rem; }
.self-check { margin-top: 1.5rem; gap: 2.5rem; }
.self-check h2 { font-size: 2rem; }
.self-check p { font-size: .9375rem; color: var(--muted); }
.symptom-checks label { border-radius: 10px; padding: .9rem 1rem; font-size: .875rem; background: var(--paper); transition: border-color 160ms ease, background 160ms ease; }
.symptom-checks label:has(input:checked) { background: var(--control-active); border-color: var(--action); }
.symptom-checks label.urgent-option { border-left: 3px solid var(--danger); }
.symptom-checks label.urgent-option:has(input:checked) { background: var(--danger-soft); border-color: var(--danger-line); border-left: 3px solid var(--danger); }
.symptom-result { border-radius: 12px; background: var(--studio); border: 1px solid var(--line); padding: 1.4rem; }
.symptom-result.urgent { background: var(--danger-soft); border: 1px solid var(--danger-line); }
#prepare-visit { display: inline-flex; margin-top: .75rem; margin-left: .5rem; }
.credits-grid { gap: 1.5rem; }
.credit-block h2 { font-size: 1.7rem; }
.credit-block p { color: var(--muted); font-size: .9375rem; }
.universities { margin: 1.5rem 0; }
.university-list { gap: 1.5rem; font-family: var(--sans); font-weight: 600; font-size: 1.25rem; }
.sources-section { margin-top: 1.5rem; }
.source-item { gap: 1.5rem; padding: 1.1rem 0; }
.source-item a { color: var(--action); font-size: .9375rem; }
.notice-content strong { display: block; color: var(--ink); font-size: 1rem; margin-bottom: .4rem; }
.notice-content p { color: var(--text); font-size: .9375rem; }
.notice-icon { display: grid; place-items: center; width: 42px; height: 42px; min-width: 42px; background: var(--surface); color: var(--amber); border-radius: 12px; }
.notice-icon svg { width: 22px; height: 22px; }
.food-notice { align-items: flex-start; gap: 1rem; padding: 1.35rem; }
.guidance-label { font-size: .75rem; color: var(--action); letter-spacing: .06em; }
.symptom-result.urgent .guidance-label, .symptom-result.urgent h3 { color: var(--danger); }
.guidance-icon { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; background: var(--surface); }
.guidance-icon svg { width: 20px; height: 20px; }

/* Diálogos, presentación y pie. */
dialog { border-color: var(--line); border-radius: 20px; padding: 2rem; box-shadow: 0 20px 70px rgb(15 35 50 / 20%); }
dialog::backdrop { background: rgb(21 37 50 / 48%); backdrop-filter: blur(4px); }
.sheet-dialog { border-radius: 20px 0 0 20px; width: min(95vw, 660px); padding: 2rem; }
.dialog-heading h2 { font-size: 2rem; }
.dialog-heading .eyebrow { font-size: .75rem; }
.dialog-actions { flex-wrap: wrap; }
.confirm-mark { width: 54px; height: 54px; display: grid; place-items: center; color: var(--danger); background: var(--danger-soft); border-radius: 16px; margin-bottom: 1.25rem; }
.confirm-mark svg { width: 26px; height: 26px; }
.confirm-dialog h2 { font-size: 1.75rem; }
.confirm-dialog > p { color: var(--muted); }
.recipe-detail-note + .recipe-detail-note { margin-top: 1rem; }
.recipe-detail-meta { flex-wrap: wrap; }
.welcome-panel { border-radius: 18px; border: 1px solid var(--line); border-top: 3px solid var(--action); box-shadow: 0 12px 40px rgb(20 45 64 / 15%); }
.welcome-panel h2 { font-size: 1.6rem; }
.welcome-top .text-link { font-size: .75rem; min-height: 36px; padding: .4rem .6rem; }
.search-result { border: 1px solid transparent; border-radius: 10px; }
.search-result:hover, .search-result[aria-selected="true"] { background: var(--control-active); border-color: var(--action); outline: 0; }
.presentation-dialog { border-radius: 0; background: var(--paper); }
.presentation-top .text-link { font-size: .8125rem; }
.slide-visual { border: 1px solid var(--line); border-radius: 18px; background: var(--surface); }
.presentation-slide .slide-content h2 { font-family: var(--sans); font-weight: 700; }
.slide-visual .slide-number { font-family: var(--sans); font-weight: 700; color: var(--action); }
.slide-dots button::after { content: none; }
.site-footer { background: transparent; border-top: 1px solid var(--line); border-radius: 0; box-shadow: none; padding-top: 2rem; padding-bottom: 2rem; gap: 1rem; }
.site-footer::after { content: none; }
.footer-brand { display: flex; align-items: center; gap: .9rem; }
.footer-brand .brand-name { color: var(--action); }
.site-footer > a, .site-footer .text-link { font-size: .8125rem; min-height: 40px; padding: .6rem .85rem; }
.toast { background: var(--ink); color: var(--surface); border-radius: 12px; }
.route { animation: route-enter 220ms var(--ease) both; }
@keyframes route-enter { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

/* Adaptación del mismo sistema, sin miniaturizar toda la interfaz. */
@media (max-width: 1250px) {
  #main-nav a { padding: .65rem; }
  #main-nav a svg { display: none; }
  .header-inner { gap: .8rem; }
  .discovery-grid { gap: 2rem; }
}
@media (max-width: 1150px) {
  .mobile-only { display: inline-flex; }
  #main-nav { display: none; position: absolute; top: 100%; left: 0; right: 0; padding: 1rem var(--gutter); background: var(--surface); border-bottom: 1px solid var(--line); gap: .6rem; grid-template-columns: repeat(2, minmax(0, 1fr)); box-shadow: 0 12px 20px rgb(20 45 64 / 8%); }
  #main-nav.open { display: grid; }
  #main-nav a { justify-content: flex-start; white-space: normal; font-size: .9375rem; padding: .8rem 1rem; }
  #main-nav a svg { display: block; }
  .header-inner { min-height: 76px; padding-top: .75rem; padding-bottom: .75rem; }
  .recipe-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .habits-layout { grid-template-columns: minmax(220px, .8fr) minmax(0, 2fr); }
  .tracking-layout { grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr); }
}
@media (max-width: 900px) {
  .page-intro { padding: 1.5rem; }
  .tracking-layout, .habits-layout { grid-template-columns: minmax(0, 1fr); }
  .tracking-aside { display: flex; }
  .habit-score { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: .5rem 1.5rem; }
  .habit-score > .small-label { grid-column: 1 / -1; }
  .habit-score .progress-orbit { grid-row: span 4; margin: 0; }
  .habit-score h2, .habit-score > p:not(.small-label) { text-align: left; }
  .education-regular { gap: 1.5rem; }
  .discovery-copy h1 { font-size: clamp(2.6rem, 5vw, 3.5rem); }
  .concept-layout { gap: 1rem; }
  .studio-heading .small-label { font-size: .6875rem; }
}
@media (max-width: 760px) {
  .page-shell { padding-bottom: 2.5rem; }
  .page-intro { margin-top: 1.25rem; }
  .intro-symbol { width: 50px; height: 50px; border-radius: 14px; }
  .discovery-grid { display: flex; flex-direction: column; gap: 1.5rem; align-items: stretch; }
  .discovery-copy { order: 0; padding: .25rem 0; }
  .kidney-studio { padding: 1.25rem; }
  .kidney-visual { max-height: 360px; }
  .hero-description { max-width: 58ch; }
  .hero-footnote { display: none; }
  .concept-layout, .education-regular, .filter-grid, .self-check, .support-grid, .habit-bottom, .discovery-bottom, .credits-grid, .part-comparison-grid, .habit-detail-tools, .source-item { grid-template-columns: minmax(0, 1fr); }
  .concept-section, .education-section { margin-top: 2rem; }
  .education-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .education-tabs button { text-align: left; }
  .discovery-bottom { gap: 1rem; }
  .glomerulus-surface { display: block; }
  .glomerulus-surface > div { max-width: 240px; margin: auto; }
  .early-detection { flex-direction: column; gap: .65rem; }
  .early-detection strong { max-width: none; }
  .symptom-categories { gap: 1rem; }
  .habit-bottom h2 { grid-row: auto; }
  .site-footer { align-items: flex-start; }
  .footer-brand { display: flex; }
  .footer-brand p { margin: 0; }
}
@media (max-width: 620px) {
  .header-inner { display: grid; grid-template-columns: minmax(0, 1fr); gap: .7rem; min-height: 0; padding-top: .85rem; padding-bottom: .7rem; }
  .brand { justify-self: start; }
  .brand-name { font-size: 1.9rem; }
  .header-tools { width: 100%; justify-content: flex-end; flex-wrap: wrap; gap: .4rem; }
  .header-tools .language-control { margin-right: auto; order: -1; }
  .header-tools .icon-button { width: 36px; height: 36px; min-width: 36px; min-height: 36px; border-color: var(--line); background: var(--surface); }
  .language-control button { font-size: .8125rem; }
  .workspace-strip { min-height: 40px; gap: .5rem; }
  .workspace-strip > .fine-print, .profile-select > span { display: none; }
  .workspace-strip .profile-select { margin-right: auto; }
  .profile-select select { max-width: 130px; }
  .workspace-strip .text-link { font-size: .6875rem; }
  html { scroll-padding-top: 12rem; }
  .page-intro { padding: 1.3rem; gap: 1rem; }
  .page-intro > .intro-symbol { display: none; }
  .page-intro .button { width: 100%; }
  .chart-surface, .week-surface, .habit-score, .note-surface, .streak-surface, .education-panel, .results-section, .filter-section, .shopping-surface, .anatomy-comparison, .tracking-aside, .daily-note, .mini-tracking, .food-teaser, .next-visit, .habit-bottom, .symptom-category, .self-check, .credit-block, .universities, .sources-section { padding: 1.2rem; border-radius: 15px; }
  .education-tabs button { padding: .75rem; gap: .5rem; font-size: .8125rem; }
  .education-regular h2 { max-width: none; }
  .recipe-grid, .symptom-categories, .form-grid, .recipe-detail-grid, .settings-grid, .comparison-inputs { grid-template-columns: minmax(0, 1fr); }
  .recipe-visual { height: 140px; }
  .recipe-card-content { padding: 1.2rem; }
  .recipe-toolbar { flex-direction: column; align-items: stretch; }
  .search-box { max-width: none; }
  .tracking-tools > .checkbox-control { width: 100%; }
  .chart-toolbar { flex-direction: column; }
  .metric-summary { align-items: flex-start; }
  .chart-footer { align-items: flex-start; }
  .chart-footer select { width: 100%; }
  .data-mode-bar { flex-direction: column; align-items: flex-start; }
  .section-heading { align-items: flex-start; }
  .section-heading > .small-label { display: none; }
  .table-actions { flex-wrap: wrap; }
  .date-filters { padding: .85rem; }
  .table-actions .button, .table-actions .text-link { font-size: .75rem; padding: .55rem .65rem; }
  .habit-score { grid-template-columns: min(120px, 36%) minmax(0, 1fr); gap: .5rem 1rem; }
  .habit-score h2 { font-size: 1.2rem; }
  .habit-score .progress-orbit strong { font-size: 2.25rem; }
  .habit-score .progress-orbit small { font-size: .875rem; }
  .habit-score .fine-print { grid-column: 1 / -1; }
  .habit-grid { grid-template-columns: minmax(78px, 1.4fr) repeat(7, minmax(23px, 1fr)); }
  .habit-grid { overflow-x: auto; }
  .habit-label { font-size: .75rem; padding-right: .35rem; }
  .habit-label small { font-size: .6875rem; }
  .habit-check { width: 23px; height: 29px; min-width: 23px; border-radius: 6px; }
  .habit-check svg { width: 14px; }
  .habit-day-heading { font-size: .6875rem; }
  .habit-day-heading strong { font-size: .8125rem; }
  .habit-day-heading.today strong { width: 24px; height: 24px; }
  .week-bottom { flex-direction: column; }
  .month-day { padding: .35rem; }
  .month-habit-list { grid-template-columns: minmax(0, 1fr); }
  .shopping-empty { align-items: flex-start; }
  .self-check .button, #prepare-visit { width: 100%; margin-left: 0; }
  .shopping-surface ul { grid-template-columns: minmax(0, 1fr); }
  .sheet-dialog { width: 100vw; border-radius: 0; padding: 1.3rem; }
  dialog:not(.sheet-dialog):not(.presentation-dialog) { padding: 1.3rem; width: 94vw; }
  .dialog-heading h2 { font-size: 1.65rem; }
  .dialog-actions .button { flex: 1; }
  .presentation-top .text-link { font-size: .75rem; padding: .5rem .65rem; }
  .presentation-controls { gap: .5rem; flex-wrap: wrap; }
  .presentation-controls .button { font-size: .8125rem; padding: .65rem .85rem; }
  .site-footer { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  .route { animation: none; }
  .button:hover, .text-link:hover, .icon-button:hover, .habit-check:hover, #main-nav a:hover { transform: none; }
}
[data-motion="reduced"] :is(.button, .text-link, .icon-button, .habit-check):hover, [data-motion="reduced"] #main-nav a:hover { transform: none; }
@media print {
  .site-header, .site-footer { display: none; }
  .page-shell { max-width: none; padding: 0; }
  .recipe-card, .chart-surface, .week-surface, .education-panel, .results-section { box-shadow: none; }
}
````

## data/contenido.en.json

````json
{
  "skip": "Skip to content",
  "mainNav": "Main navigation",
  "language": "Language",
  "present": "Presentation mode",
  "menu": "Open menu",
  "navDiscover": "Discover",
  "navTrack": "My records",
  "navFood": "Food",
  "navHabits": "Habits",
  "navSigns": "Signs",
  "academic": "LEARNING EXPERIENCE / COIL",
  "discoverEyebrow": "DIABETES AND KIDNEY HEALTH",
  "anatomy": "01 / INTERACTIVE ANATOMY",
  "schematic": "EDUCATIONAL DIAGRAM",
  "exploreParts": "Explore kidney structures",
  "heroEyebrow": "UNDERSTANDING TO CARE",
  "heroTitle": "Your kidney health,",
  "heroAccent": "up close.",
  "heroDescription": "A space to understand how diabetes can affect your kidneys and how you can care for them, every day.",
  "compareFilter": "Compare filtration",
  "startTracking": "View my records",
  "heroMessage": "Having diabetes does not mean you will develop kidney damage. Follow-up and daily care can reduce the risk.",
  "exploreHint": "Select a point on the kidney to explore.",
  "fiveParts": "5 structures",
  "filterEyebrow": "ONE FILTER, MANY WAYS TO CARE",
  "filterTitle": "How filtration can change",
  "closeComparison": "Close comparison",
  "illustrative": "Conceptual simulation",
  "progression": "Explore the changes",
  "filterHealthy": "Preserved filtration",
  "filterAffected": "Affected filtration",
  "filterDisclaimer": "This does not represent clinical stages, percentages of function or an individual's progression. Damage is not inevitable.",
  "educationEyebrow": "KNOWLEDGE IS PART OF CARE",
  "educationTitle": "Understand the essentials.",
  "fourChapters": "FOUR CHAPTERS",
  "chapters": "Kidney health chapters",
  "dailyStep": "ONE STEP FOR TODAY",
  "dailyTitle": "Make room for your care.",
  "dailyDescription": "Organize your measurements, explore a cooking idea and track the habits you agreed on with your health care team.",
  "viewHabits": "View my habits",
  "trackingPreview": "A LOOK AT YOUR RECORDS",
  "openTracking": "Open all records",
  "trackEyebrow": "YOUR DATA, IN CONTEXT",
  "trackTitle": "Every record matters.",
  "trackDescription": "Keep your measurements and laboratory results together to discuss at your appointments.",
  "addRecord": "Add measurement",
  "trendEyebrow": "TREND",
  "period": "Period",
  "sevenDays": "7 days",
  "thirtyDays": "30 days",
  "allTime": "All time",
  "metric": "Measurement",
  "readTogether": "READ THEM TOGETHER",
  "noSingleNumber": "Your health is more than a number.",
  "trackNote": "A trend helps organize information. A single measurement cannot confirm or rule out kidney disease.",
  "rangesNote": "The example's colors and reference bands await clinical validation. Your targets must be individual.",
  "viewReferences": "View example references",
  "localOnly": "Stored only in this browser.",
  "history": "HISTORY",
  "resultsTitle": "Your results, organized.",
  "exportCSV": "Export CSV",
  "clearRecords": "Delete records",
  "from": "From",
  "to": "To",
  "resetDates": "Clear date filter",
  "resultsDisclaimer": "Illustrative values do not replace medical assessment. Color comparisons for personal records require the health care team to validate the references.",
  "todayRecipe": "AN IDEA TO REVIEW",
  "foodTeaserTitle": "Cooking can be simple, too.",
  "foodTeaserDescription": "Find sample dishes to discuss with your dietitian. Portions and ingredients must be adapted to each person.",
  "openRecipes": "Explore recipes",
  "nextVisit": "AT YOUR NEXT APPOINTMENT",
  "askTeam": "Questions worth bringing.",
  "foodEyebrow": "FLAVOR, CARE AND CONTEXT",
  "foodTitle": "Ideas for your table.",
  "foodDescription": "A sample recipe collection to review with your health care team, as a starting point.",
  "dietNote": "There is no single kidney diet. Protein, potassium, phosphorus, sodium and fluids depend on your kidney function and results. All these recipes require validation.",
  "searchRecipe": "Search for a recipe or ingredient",
  "lessSalt": "Ideas with less salt",
  "onlyFavorites": "My favorites",
  "mealFilter": "Meal type",
  "sodiumNote": "“Less salt” identifies ideas using fresh ingredients with no added salt; it is not a low-sodium nutritional claim. Check labels and portions.",
  "habitsEyebrow": "CARE TAKES PRACTICE",
  "habitsTitle": "Small steps. Every day.",
  "habitsDescription": "Track the habits in your plan. Consistency starts with what you can do.",
  "weekProgress": "YOUR WEEK",
  "streakLabel": "consecutive days with a habit recorded",
  "habitTargets": "Initial sample goals: activity on 5 days; other habits on 7. Adjust frequency with your health care team.",
  "previousWeek": "Previous week",
  "nextWeek": "Next week",
  "habitHint": "Mark each day you complete a habit. Select it again to correct it.",
  "clearWeek": "Clear week",
  "yourPace": "At your pace, with support.",
  "habitNote": "Adapt activity to your condition and consult before changing your routine. Do not increase fluids or protein without professional guidance.",
  "readPrevention": "Read about prevention",
  "signsEyebrow": "OBSERVE WITHOUT SELF-DIAGNOSING",
  "signsTitle": "Listen to the signs.",
  "signsDescription": "Symptoms can have different causes. Understanding them helps you seek care and prepare for a visit.",
  "silentTitle": "Early damage can be silent.",
  "silentNote": "Feeling well does not rule out kidney problems. Blood and urine tests can detect changes before they are noticeable.",
  "selfCheckEyebrow": "PREPARE FOR YOUR VISIT",
  "selfCheckTitle": "What have you noticed?",
  "selfCheckDescription": "Select what you are experiencing now. This tool organizes signs; it does not calculate risk or make a diagnosis.",
  "symptomsPrivacy": "Your selections are not saved.",
  "checkSymptoms": "View guidance",
  "projectEyebrow": "KNOWLEDGE THAT CONNECTS",
  "projectTitle": "Different perspectives. Shared care.",
  "projectDescription": "A COIL project bringing together design, technology and health education to make kidney care more accessible.",
  "sourcesTitle": "Sources and review.",
  "contentReview": "Academic review pending",
  "footerProject": "COIL PROJECT / KIDNEY HEALTH",
  "footerNote": "Education to understand. Professional support to decide.",
  "credits": "Project, credits and sources",
  "personalRecord": "PERSONAL RECORD",
  "newRecord": "New measurement.",
  "close": "Close",
  "recordHelp": "Enter at least one measurement. Copy the units from your results; we do not calculate filtration from creatinine.",
  "cancel": "Cancel",
  "saveRecord": "Save measurement",
  "referenceTitle": "Targets in context.",
  "delete": "Delete",
  "presentation": "Presentation",
  "exitPresentation": "Exit presentation",
  "previous": "Previous",
  "next": "Continue",
  "presentationHint": "Use ← → to navigate · Esc to exit",
  "demoMode": "DEMONSTRATION DATA",
  "realMode": "MY RECORDS",
  "demoDescription": "Fictional examples. They do not belong to a person.",
  "realDescription": "Your personal measurements, separate from the example.",
  "showReal": "View my records",
  "showDemo": "View example",
  "noRecords": "No measurements yet.",
  "noRecordsHint": "Add a record or explore the demonstration data.",
  "noFilteredRecords": "No measurements in this period.",
  "noChartData": "No values for this measurement in this period.",
  "chartSampleBand": "Example band · unvalidated",
  "chartNoBand": "No individual target configured",
  "chartRecords": "{count} recorded values",
  "chartDelta": "Change: {delta} {unit} between the first and last record.",
  "chartSingle": "One value: more records are needed to see a trend.",
  "chartAccessible": "{metric} trend. {summary}",
  "date": "Date",
  "glucose": "Fasting glucose",
  "hba1c": "HbA1c",
  "systolic": "Systolic pressure",
  "diastolic": "Diastolic pressure",
  "creatinine": "Creatinine",
  "egfr": "eGFR (estimated filtration)",
  "uacr": "Urine albumin/creatinine",
  "weight": "Weight",
  "glucoseShort": "Glucose",
  "bloodPressure": "Blood pressure",
  "status": "Reference",
  "actions": "Actions",
  "reviewPending": "For assessment",
  "exampleWithin": "Example: within range",
  "exampleAttention": "Example: attention",
  "exampleConsult": "Example: consult",
  "referenceWithin": "Within reference",
  "referenceAttention": "Review with your team",
  "referenceConsult": "Consult your clinician",
  "deleteRecord": "Delete measurement from {date}",
  "recordSaved": "Measurement saved in this browser.",
  "saveFailed": "Unable to save. Check storage space or browser permissions.",
  "invalidRecord": "Check the date and enter at least one valid measurement.",
  "futureRecord": "The date cannot be in the future.",
  "pressurePair": "Enter both pressure values; systolic must be higher than diastolic.",
  "invalidDates": "The start date must be on or before the end date.",
  "dateRequired": "Measurement date",
  "optional": "Optional",
  "savedMeasurements": "{count} personal measurements",
  "deleteTitle": "Delete these records?",
  "deleteDescription": "They will be removed from this browser. Export a CSV copy if you want to keep them.",
  "deleteOneDescription": "This measurement will be removed from this browser.",
  "deleted": "Records deleted.",
  "emptyExport": "No visible records to export.",
  "exported": "CSV exported.",
  "demoClearNote": "Examples cannot be deleted. Switch to My records to delete personal data.",
  "referencesDisclaimer": "These bands and rules are interface examples, not personal targets or diagnostic thresholds. Personal indicators are disabled until validated by the health care team.",
  "referencesIndividual": "Creatinine and weight have no universal reference. Kidney results require context, trends and clinical assessment.",
  "recipesFound": "{count} sample dishes",
  "noRecipes": "No dishes match these filters.",
  "clearRecipeFilters": "Clear filters",
  "allMeals": "All",
  "breakfast": "Breakfast",
  "lunch": "Lunch",
  "dinner": "Dinner",
  "snack": "Snack",
  "recipeExample": "Example to validate with your health care team",
  "reviewNutritionist": "To review with a dietitian",
  "recipeOpen": "View preparation",
  "minutes": "min",
  "servings": "{count} sample servings",
  "saveFavorite": "Save favorite: {title}",
  "removeFavorite": "Remove favorite: {title}",
  "favoriteSaved": "Recipe saved to favorites.",
  "favoriteRemoved": "Recipe removed from favorites.",
  "ingredients": "Ingredients",
  "preparation": "Preparation",
  "reviewNote": "Review before preparing",
  "weekCompleted": "{done} of {total} habit records in the weekly goal.",
  "feedbackStart": "One first step is enough.",
  "feedbackSome": "You are building consistency.",
  "feedbackGood": "You are making room for care.",
  "feedbackComplete": "Your week is recorded.",
  "habitColumn": "Habit",
  "habitDay": "{habit}, {date}",
  "futureDay": "Future day",
  "weekClearTitle": "Clear this week?",
  "weekClearDescription": "This week's marks will be removed. Other weeks will be kept.",
  "habitUpdated": "Habit updated.",
  "alertUrgent": "Seek emergency care now.",
  "alertUrgentNote": "Severe breathing difficulty or sudden confusion need urgent care, whatever the cause. Contact your local emergency services.",
  "alertVisit": "Contact your health care team.",
  "alertVisitNote": "Discuss these signs, especially if they are new, persistent or worsening. Seek urgent care if they become severe. Do not change medicines on your own.",
  "alertNone": "Keep your scheduled checkups.",
  "alertNoneNote": "Not selecting symptoms does not rule out kidney damage. Ask about the blood and urine tests you need.",
  "sourceLabel": "Source",
  "year": "Year",
  "population": "Population",
  "pendingSource": "[source to confirm]",
  "pendingYear": "[year to confirm]",
  "pendingPopulation": "[population to confirm]",
  "draftStat": "DRAFT FIGURE / UNVALIDATED",
  "draftEstimate": "Estimate proposed by the team; do not use as verified global prevalence.",
  "globalView": "Global perspective",
  "globalNote": "Frequency varies by country, population and definition of kidney disease. These figures must not be applied to all people with diabetes.",
  "mexico": "Mexico",
  "usComparison": "Available reference: United States",
  "usNumber": "≈ 1 in 3",
  "usPopulation": "Adults with diabetes in the United States; CDC 2019 reference cited by NIDDK.",
  "labReminder": "Assessment combines blood and urine tests and changes over time.",
  "educationCTA": "Organize my care",
  "knowledgeNote": "Educational information. Final review with the academic and health care team.",
  "slideLearning": "UNDERSTAND",
  "slideCare": "CARE",
  "slideTrack": "TRACK",
  "slideFood": "ADAPT",
  "slideConnect": "COLLABORATE",
  "slideDemoNote": "Demonstration chart with fictional data. Personal records are not shown.",
  "slideQuestion": "What can we do today to care for tomorrow's kidneys?",
  "slideGo": "Go to slide {number}",
  "presentationEnd": "End of presentation",
  "sourceChecked": "Accessed October 6, 2026",
  "notClinical": "Educational prototype, without diagnosis or prescriptions.",
  "storageWarning": "Your browser does not allow data storage. Changes will not persist after closing.",
  "fieldUnits": "Enter the value in {unit}.",
  "symptomsSelected": "Selected signs: {count}.",
  "filterBlood": "Incoming blood",
  "filterMembrane": "Filtration barrier",
  "filterUrine": "Toward urine",
  "filterProtein": "Proteins",
  "filterWaste": "Water and waste",
  "filterDiagramLabel": "Diagram of water, waste and proteins moving through a filtration barrier.",
  "pageTitle": "Renal · COIL Project",
  "pageDescription": "Diabetes and kidney health education: explore, learn and organize your care.",
  "weekRange": "{start} — {end}",
  "recordDateHint": "Use the test or measurement date.",
  "demoTableNote": "Colored labels are unvalidated interface examples.",
  "personalTableNote": "Interpretation pending with your health care team.",
  "slideSources": "Sources, credits and editable content in the Project section.",
  "sourcePendingDisclaimer": "The 2–4 in 10 and 1 in 4 in Mexico figures come from the team's draft. Source, year and population remain to be confirmed.",
  "recipeCardNote": "TO VALIDATE",
  "habitSource": "Draft activity goal: 30 minutes on 5 days, adapted to your condition. CDC recommends 150 minutes weekly for many adults.",
  "glucoseFormHint": "Fasting result, according to your team's instructions.",
  "egfrFormHint": "Copy the laboratory eGFR. It is not the creatinine value.",
  "uacrFormHint": "Albumin/creatinine ratio in mg/g only; not albumin in mg/L.",
  "formUnitsNote": "If your laboratory uses different units, ask before entering the results.",
  "sourceLink": "Read source",
  "optionalInputs": "Fields with no data can be left blank.",
  "savedSuccessTitle": "Personal data",
  "educationAffects": "It can affect people with type 1 and type 2 diabetes, in any country.",
  "showAllResults": "View results",
  "filterStageAccessible": "Conceptual change {number} of 4",
  "studyTeam": "COIL TEAM",
  "sourceTable": "Content references",
  "clearFilters": "Clear filters",
  "visitQuestion1": "What are my glucose and pressure targets?",
  "visitQuestion2": "When should I repeat my blood and urine tests?",
  "visitQuestion3": "Should I adjust food or fluids?",
  "ingredientNotFound": "Try another ingredient or meal type.",
  "selectedPart": "Selected structure",
  "formRangeError": "Check the units and values you entered.",
  "signsDisclaimer": "Do not wait for this tool's result if you feel you need urgent care.",
  "openProject": "Explore the project",
  "slideKidneyDescription": "Kidneys remove waste and water from blood. Diabetes and high pressure can affect their small vessels.",
  "slideLabDescription": "Kidney assessment combines urine albumin and an estimate of filtration from a blood test.",
  "slidePreventionDescription": "Glucose and pressure, prescribed medicines, adapted activity and checkups. Everyday care with your team's support.",
  "slideFoodDescription": "No recipe suits everyone. Kidney function and results guide adjustments.",
  "slideHabitsDescription": "Recording small steps makes consistency visible, without replacing your health care plan.",
  "slideThanks": "Learning together for better care.",
  "emptyHabitsLabel": "No habit records this week.",
  "glucoseChartLabel": "Fasting glucose (mg/dL)",
  "printUnits": "Units",
  "validationPending": "Clinical validation pending",
  "slidePress": "Educational presentation",
  "sourceNoDate": "Review date to confirm",
  "nutritionAmount": "Amounts are preparation examples, not prescribed portions.",
  "profileNone": "Profiles are stored unencrypted in this browser. Anyone with browser access can read them. They are not private accounts.",
  "recipeShortBadge": "EXAMPLE",
  "noFavoriteYet": "Save a recipe with the heart to see it here.",
  "habitWeeklyGoal": "Goal: {count} days",
  "tableFullData": "Full measurement table",
  "resultsCount": "{count} visible records",
  "allMetrics": "All measurements",
  "viewSource": "View source",
  "stepLabel": "STEP {number}",
  "slideOf": "{current} / {total}",
  "sourceScope": "Source scope",
  "futureNote": "Future days become available on their date.",
  "resetComplete": "Week cleared.",
  "demoNoSave": "The example does not change your personal data.",
  "unitsDisclaimer": "Check that units match your laboratory report.",
  "slideCreditLabel": "INTERUNIVERSITY COLLABORATION",
  "parts": [
    {
      "id": "corteza",
      "title": "Renal cortex",
      "description": "The outer layer. It contains structures where blood filtration begins."
    },
    {
      "id": "medula",
      "title": "Renal medulla",
      "description": "The inner region. Its tubules help concentrate urine and recover water and substances the body needs."
    },
    {
      "id": "glomerulo",
      "title": "Glomerulus",
      "description": "A small cluster of vessels acting as a filter. Water and waste pass through; large proteins usually stay in the blood."
    },
    {
      "id": "ureter",
      "title": "Ureter",
      "description": "The tube carrying urine from the kidney to the bladder. It does not carry blood."
    },
    {
      "id": "arteria",
      "title": "Renal artery",
      "description": "The vessel supplying blood to the kidney. High glucose and blood pressure can damage small vessels in the filtration system."
    }
  ],
  "filterStages": [
    {
      "title": "A barrier that selects.",
      "description": "With preserved filtration, water and small molecules pass through. Blood cells and most large proteins remain in circulation."
    },
    {
      "title": "Small vessels face pressure.",
      "description": "Sustained high glucose and elevated pressure can affect filter structures. There may be no symptoms at first."
    },
    {
      "title": "Some proteins may pass through.",
      "description": "When the barrier changes, urine albumin may increase. A test measures it; looking at urine cannot confirm it."
    },
    {
      "title": "Filtration may decrease.",
      "description": "If damage progresses, the kidney may remove less waste. Repeated tests and clinical context assess progression; care and treatment may slow it."
    }
  ],
  "sections": [
    {
      "id": "causas",
      "tab": "Causes and risks",
      "eyebrow": "01 / UNDERSTAND",
      "title": "Why can kidney damage occur?",
      "description": "Diabetic kidney disease is kidney damage related to type 1 or type 2 diabetes. Long-term high glucose can affect the kidney’s small blood vessels.",
      "pointsTitle": "Factors that can increase risk",
      "points": [
        "More years with diabetes and sustained high glucose.",
        "High blood pressure, cholesterol and triglycerides.",
        "Age, family history of kidney disease and previous kidney injury.",
        "Smoking, inactivity, excess salt and obesity."
      ],
      "note": "Risk can be reduced: managing glucose and blood pressure, following treatment and attending checkups helps protect the kidneys.",
      "sources": [
        "niddk-dkd",
        "mayo"
      ]
    },
    {
      "id": "epidemiologia",
      "tab": "Who is affected?",
      "eyebrow": "02 / GLOBAL PERSPECTIVE",
      "title": "Prevention starts with context.",
      "description": "Kidney disease is an important diabetes complication worldwide. Risk varies with diabetes duration, age, glucose control, blood pressure, weight and blood lipids.",
      "pointsTitle": "A figure needs context",
      "points": [
        "Comparing countries requires knowing the population, year and disease definition.",
        "Draft figures are displayed pending verification.",
        "A population statistic does not predict an individual’s progression."
      ],
      "note": "Not everyone with diabetes develops kidney damage. Statistics help study the issue; checkups guide personal care.",
      "sources": [
        "niddk-dkd"
      ]
    },
    {
      "id": "prevencion",
      "tab": "Daily care",
      "eyebrow": "03 / CARE",
      "title": "Daily care can make a difference.",
      "description": "Early detection and diabetes management can prevent or delay complications. Damage can develop slowly without obvious signs.",
      "pointsTitle": "Care to agree on with your team",
      "points": [
        "Glucose and pressure: know your targets and monitor as advised.",
        "Medicines: follow prescribed treatment and ask before making changes.",
        "Avoid tobacco and vaping; seek support to quit.",
        "Adapted activity: one possible goal is 30 minutes on 5 days. Include strength work if advised.",
        "Food and fluids: review salt and adapt amounts to your results.",
        "Checkups: ask about yearly tests for type 2 diabetes and after 5 years of type 1 diabetes, or sooner if advised."
      ],
      "note": "This is not an absolute guarantee of prevention. Testing frequency, exercise and targets must be adapted to each person.",
      "sources": [
        "niddk-dkd",
        "cdc-activity",
        "niddk-diet"
      ]
    },
    {
      "id": "manifestaciones",
      "tab": "Signs and tests",
      "eyebrow": "04 / DETECT",
      "title": "Tests are part of the answer.",
      "description": "Early stages can have few or no symptoms. Blood and urine tests help assess how the kidneys work.",
      "pointsTitle": "Two complementary tests",
      "points": [
        "Blood: creatinine helps the laboratory estimate glomerular filtration rate (eGFR).",
        "Urine: the albumin/creatinine ratio helps assess protein loss.",
        "The team interprets repeated results alongside clinical history.",
        "Thirst and frequent urination can accompany diabetes; they do not confirm kidney damage."
      ],
      "note": "Swelling, changes in urine or tiredness need assessment. General diabetes symptoms should not be confused with confirmation of kidney disease.",
      "sources": [
        "niddk-tests",
        "cdc-signs",
        "mayo"
      ]
    }
  ],
  "symptomCategories": [
    {
      "title": "General diabetes symptoms",
      "subtitle": "These are not proof of kidney damage.",
      "items": [
        "Thirst and frequent urination",
        "Extreme hunger",
        "Tiredness and dizziness",
        "Wounds that heal slowly"
      ]
    },
    {
      "title": "Signs needing kidney assessment",
      "subtitle": "They can also have other causes.",
      "items": [
        "Swelling in feet, legs, hands or face",
        "Foamy urine or changes in frequency, color or smell",
        "Nausea, poor appetite or persistent tiredness"
      ]
    },
    {
      "title": "Other diabetes-related effects",
      "subtitle": "Complications assessed separately.",
      "items": [
        "High pressure and cardiovascular risk",
        "Vision changes",
        "Loss of sensation in the feet"
      ]
    },
    {
      "title": "Laboratory findings",
      "subtitle": "Detected in blood and urine.",
      "items": [
        "Elevated urine albumin or proteins",
        "Decreased estimated filtration",
        "Progressive changes in repeated tests"
      ]
    }
  ],
  "symptomChecks": [
    {
      "id": "breathing",
      "text": "Severe difficulty breathing right now",
      "urgent": true
    },
    {
      "id": "confusion",
      "text": "Sudden confusion or difficulty staying alert",
      "urgent": true
    },
    {
      "id": "swelling",
      "text": "New or persistent swelling",
      "urgent": false
    },
    {
      "id": "urine",
      "text": "Persistent urine changes",
      "urgent": false
    },
    {
      "id": "nausea",
      "text": "Persistent nausea, low appetite or tiredness",
      "urgent": false
    },
    {
      "id": "diabetes",
      "text": "Thirst, frequent urination or slow-healing wounds",
      "urgent": false
    }
  ],
  "habits": [
    {
      "id": "activity",
      "title": "Adapted activity",
      "detail": "30 min, if advised",
      "target": 5
    },
    {
      "id": "tobacco",
      "title": "No tobacco or vaping",
      "detail": "Seek support when needed",
      "target": 7
    },
    {
      "id": "glucose",
      "title": "Glucose as planned",
      "detail": "Only the advised frequency",
      "target": 7
    },
    {
      "id": "medicine",
      "title": "Prescribed medicines",
      "detail": "According to prescription",
      "target": 7
    },
    {
      "id": "salt",
      "title": "Mindful of salt",
      "detail": "Check labels and preparations",
      "target": 7
    },
    {
      "id": "fluids",
      "title": "Fluids as planned",
      "detail": "The amount advised by my team",
      "target": 7
    }
  ],
  "creditsBlocks": [
    {
      "number": "01",
      "title": "Collaborative design",
      "text": "Laura’s mockup is the starting point: illustration on the left, information on the right, measurements and recommendations. This version keeps that logic and expands interaction."
    },
    {
      "number": "02",
      "title": "Building knowledge",
      "text": "Zoom meetings and work across universities bring together causes, epidemiology, prevention and detection. The team will add meeting evidence and participant names."
    },
    {
      "number": "03",
      "title": "Accessible language",
      "text": "Spanish and English versions make sharing easier. Both translations require academic and terminology review by the participating teams."
    },
    {
      "number": "04",
      "title": "Next steps",
      "text": "Confirm epidemiological sources, validate individual ranges, approve recipes and complete credits. Publication and the domain will be decided after this review."
    }
  ],
  "universities": [
    "Universidad Católica de Colombia",
    "Tecnológico de Monterrey",
    "Universidad de Florida"
  ],
  "creditReview": "Institutions from the project base; confirm names, participants and authorizations before publication.",
  "kidneyTitle": "Kidney: interactive diagram",
  "kidneyDescription": "Schematic kidney cross-section. Five points explore the cortex, medulla, glomerulus, ureter and artery.",
  "fullscreen": "Full screen",
  "servingsOne": "1 sample serving",
  "recipesFoundOne": "1 sample dish",
  "resultsCountOne": "1 visible record",
  "chartRecordsOne": "1 recorded value",
  "savedMeasurementsOne": "1 personal measurement",
  "fullscreenUnavailable": "Full screen is unavailable here. Use your browser’s full-screen option; you can keep using this viewer.",
  "searchAll": "Search the project",
  "settings": "Settings",
  "theme": "Appearance",
  "lightTheme": "Light",
  "darkTheme": "Dark",
  "systemTheme": "Use device setting",
  "motion": "Motion",
  "reduceMotion": "Reduce motion",
  "allowMotion": "Allow motion, respecting device settings",
  "systemMotion": "Use device setting",
  "localProfile": "Local profile",
  "newProfile": "Create profile",
  "profileName": "Profile name",
  "create": "Create",
  "profileExport": "Export profile JSON",
  "profileImport": "Import profile JSON",
  "profilePrivacy": "Profiles are stored unencrypted in this browser. Anyone with browser access can read them. They are not private accounts.",
  "declaredEgfr": "Declared eGFR (optional)",
  "declaredEgfrHint": "Copy the result confirmed by your team, in mL/min/1.73 m². This app does not calculate it.",
  "saveSettings": "Save settings",
  "privacy": "Privacy",
  "privacyTitle": "Your data, in this browser.",
  "privacyBody": "Records, notes, habits and favorites remain until you delete them or clear browser data. They are not sent to a server. You control exported files. Team contact: to be confirmed. Migration backups are removed when you clear all site data in the browser.",
  "deleteProfile": "Delete this profile",
  "deleteProfileHint": "All history in this local profile will be deleted. Export first if you want to keep it.",
  "welcomeTitle": "Meet your care space.",
  "welcomeStep": "Step {current} of 3",
  "welcomeLanguage": "Choose your reading language.",
  "welcomeMode": "Explore an example or start your record.",
  "welcomePrivacy": "Your information stays in this browser.",
  "welcomeDemo": "Explore the fictional example",
  "welcomePersonal": "Start my records",
  "start": "Start",
  "shortcuts": "Keyboard shortcuts",
  "shortcutNav": "Go to a section: press g, then the letter",
  "shortcutPresentation": "Presentation · Esc to close",
  "shortcutNotes": "Presenter notes",
  "shortcutReset": "Reset timer",
  "shortcutPause": "Pause or resume timer",
  "searchPlaceholder": "Find a part, recipe or habit…",
  "searchCount": "{count} results. Use ↑ ↓ and Enter.",
  "searchEmpty": "Try another term.",
  "section": "Section",
  "chapter": "Chapter",
  "recipe": "Recipe",
  "habit": "Habit",
  "profileImported": "Profile imported as a new copy.",
  "importConfirm": "Confirm import",
  "importPreview": "Review the import",
  "importInvalid": "This file is invalid. Your data has not changed.",
  "importCSV": "Import CSV",
  "importCSVHint": "Accepts CSV exported by Renal. Review rows, units and origin before saving.",
  "acceptedRows": "Accepted rows: {count}",
  "rejectedRows": "Rejected rows: {count}",
  "duplicates": "Date and metric matches: {count}",
  "keepBoth": "Keep both measurements",
  "overwrite": "Overwrite matching metrics",
  "importOrigin": "Fictional examples are excluded from the personal profile.",
  "notes": "Notes",
  "recordNotesHint": "Maximum 280 characters. Avoid information you do not want to leave in a shared browser.",
  "tags": "Measurement context",
  "tag-fasting": "Fasting",
  "tag-post-dinner": "After dinner",
  "tag-visit": "At appointment",
  "allTags": "All contexts",
  "compareDates": "Compare two records",
  "firstRecord": "First record",
  "secondRecord": "Last record",
  "comparisonResult": "Difference: {delta} {unit} · Change: {percent}",
  "noPercent": "Cannot calculate (initial value is zero)",
  "compareHint": "The difference describes values; it does not interpret their clinical meaning.",
  "quickGlucose": "Glucose only",
  "exportPDF": "Print / save PDF",
  "consultation": "Prepare appointment view",
  "professionalNotes": "Notes for your clinician",
  "professionalHint": "Optional space. Maximum 3000 characters.",
  "myStory": "My story · last 30 days",
  "storyTitle": "Your story in data.",
  "storyCount": "You recorded {count} entries in the last 30 days.",
  "storyMetric": "{metric}: from {first} to {last} {unit}; difference {delta} {unit}.",
  "storyEnd": "This summary describes records without evaluating their clinical meaning. Review it with your healthcare team.",
  "exportText": "Export text",
  "periodPrinted": "Period: {from} — {to}",
  "print": "Print / save PDF",
  "printBlocked": "Allow pop-ups to open the print view.",
  "servingsControl": "Example servings",
  "addShopping": "Add to my shopping list",
  "shoppingList": "Your shopping list",
  "shoppingEmpty": "Add preparations from their detail view.",
  "shoppingAdded": "Preparation added to the list.",
  "shoppingClear": "Clear list",
  "substitutions": "Substitutions · validation pending",
  "onlyUnvalidated": "Unvalidated only",
  "renalFoodWarning": "Your profile declares an eGFR below 60. Review potassium, phosphorus and portions with your team; this list does not calculate requirements or prescribe restrictions.",
  "weeklyView": "Week",
  "monthlyView": "Month",
  "dailyNote": "Daily note",
  "saveNote": "Save note",
  "noteSaved": "Note saved.",
  "habitStreak": "{count} consecutive days",
  "exportHabits": "Export habits CSV",
  "monthPrevious": "Previous month",
  "monthNext": "Next month",
  "monthlyHint": "Each day shows marked habits. Select a date to review marks and its note.",
  "prepareVisit": "Prepare appointment questions",
  "questionsTitle": "To discuss with your team.",
  "symptomQuestion": "How should this sign be assessed: {symptom}? Which changes should I watch for and when should I follow up?",
  "urgentQuestions": "Do not delay urgent care to prepare this list.",
  "notDiagnosis": "Educational guidance · not a diagnosis",
  "urgentAlert": "URGENT ALERT",
  "compareParts": "Compare two parts",
  "comparisonPartA": "First part",
  "comparisonPartB": "Second part",
  "partFocus": "Part explanation",
  "reviewQuiz": "Review · 5 questions",
  "quizTitle": "What did you learn about the kidney?",
  "checkAnswers": "Check answers",
  "quizScore": "{score} out of 5. Your score is not saved.",
  "quizCorrect": "Correct answer",
  "quizTry": "Review this part’s explanation.",
  "beforeAfter": "A change, seen from within.",
  "beforeLabel": "Preserved filtration",
  "afterLabel": "Conceptual change",
  "conceptSlider": "Conceptual filtration comparison",
  "conceptTimeline": "Year {year} · conceptual",
  "conceptDisclaimer": "Concept illustration: years are narrative markers, not a clinical timeline or prediction. Progression can vary and requires professional assessment.",
  "presenterNotes": "Notes for the presenter",
  "notesFullscreen": "Notes are hidden in native fullscreen. In the window viewer, everyone can see them.",
  "presentationExport": "Export 9 scenes as PDF",
  "timer": "Presentation time",
  "waitingTitle": "Learning together for better care.",
  "waitingHint": "Press → to begin.",
  "install": "Install",
  "recoveryTitle": "We kept the previous state.",
  "recoveryHint": "Migration failed. Download the original backup before restarting; your data has not been overwritten.",
  "downloadBackup": "Download original backup",
  "restart": "Restart after backup",
  "profilePreview": "Profile: {name} · {count} records",
  "filterDates": "Selected dates",
  "technicalReport": "Prototype validation and limitations",
  "skipWelcome": "Skip",
  "reviewQuestions": [
    {
      "question": "Which structure brings blood to the kidney?",
      "answer": "arteria"
    },
    {
      "question": "Which tube carries urine to the bladder?",
      "answer": "ureter"
    },
    {
      "question": "Which cluster of small vessels acts as a filter?",
      "answer": "glomerulo"
    },
    {
      "question": "Which is the outer layer of the kidney?",
      "answer": "corteza"
    },
    {
      "question": "Which region contains tubules that help concentrate urine?",
      "answer": "medula"
    }
  ],
  "statistics": [
    {
      "id": "global-draft",
      "display": "2–4 / 10",
      "sourceId": null,
      "source": null,
      "url": null,
      "year": null,
      "population": null,
      "methodology": null,
      "verified": false
    },
    {
      "id": "mexico-draft",
      "display": "1 / 4",
      "sourceId": null,
      "source": null,
      "url": null,
      "year": null,
      "population": null,
      "methodology": null,
      "verified": false
    },
    {
      "id": "us-reference",
      "display": "≈ 1 / 3",
      "sourceId": "niddk-dkd",
      "source": "NIDDK; CDC 2019 reference",
      "url": "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/diabetic-kidney-disease",
      "year": 2019,
      "population": "Adults with diabetes in the United States",
      "methodology": null,
      "verified": true
    }
  ],
  "habitStreakOne": "1 consecutive day",
  "perHabitStreakTitle": "Consistency, habit by habit.",
  "methodology": "Methodology",
  "pendingMethodology": "[methodology to be confirmed]",
  "reviewContacts": {
    "clinicalReviewer": null,
    "nutritionReviewer": null,
    "englishReviewer": null,
    "coordinator": null,
    "teamMembers": []
  },
  "foodNoticeTitle": "Before choosing a recipe",
  "shoppingEyebrow": "ORGANIZE YOUR INGREDIENTS",
  "shoppingEmptyTitle": "Your list is ready to get started",
  "shoppingClearHint": "All ingredients will be removed from your shopping list.",
  "shoppingCleared": "Shopping list cleared.",
  "shoppingCount": "{count} ingredients",
  "shoppingCountOne": "{count} ingredient"
}
````

## data/contenido.es.json

````json
{
  "skip": "Ir al contenido",
  "mainNav": "Navegación principal",
  "language": "Idioma",
  "present": "Modo presentación",
  "menu": "Abrir menú",
  "navDiscover": "Descubrir",
  "navTrack": "Mi seguimiento",
  "navFood": "Alimentación",
  "navHabits": "Hábitos",
  "navSigns": "Señales",
  "academic": "EXPERIENCIA EDUCATIVA / COIL",
  "discoverEyebrow": "DIABETES Y SALUD RENAL",
  "anatomy": "01 / ANATOMÍA INTERACTIVA",
  "schematic": "ESQUEMA EDUCATIVO",
  "exploreParts": "Explorar partes del riñón",
  "heroEyebrow": "COMPRENDER PARA CUIDAR",
  "heroTitle": "Tu salud renal,",
  "heroAccent": "vista de cerca.",
  "heroDescription": "Un espacio para entender cómo la diabetes puede afectar tus riñones y qué puedes hacer para cuidarlos, cada día.",
  "compareFilter": "Comparar el filtrado",
  "startTracking": "Ver mi seguimiento",
  "heroMessage": "Tener diabetes no significa que tus riñones se dañarán. El seguimiento y los cuidados pueden reducir el riesgo.",
  "exploreHint": "Toca los puntos del riñón para explorar.",
  "fiveParts": "5 estructuras",
  "filterEyebrow": "UN FILTRO, MUCHOS CUIDADOS",
  "filterTitle": "Lo que cambia en el filtrado",
  "closeComparison": "Cerrar comparación",
  "illustrative": "Simulación conceptual",
  "progression": "Explora los cambios",
  "filterHealthy": "Filtrado conservado",
  "filterAffected": "Filtrado afectado",
  "filterDisclaimer": "No representa etapas clínicas, porcentajes de función ni la evolución de una persona. El daño no es inevitable.",
  "educationEyebrow": "EL CONOCIMIENTO TAMBIÉN CUIDA",
  "educationTitle": "Entiende lo esencial.",
  "fourChapters": "CUATRO CAPÍTULOS",
  "chapters": "Capítulos sobre salud renal",
  "dailyStep": "UN PASO PARA HOY",
  "dailyTitle": "Haz espacio para tus cuidados.",
  "dailyDescription": "Organiza tus mediciones, revisa una idea para cocinar y registra los hábitos que acordaste con tu equipo de salud.",
  "viewHabits": "Ver mis hábitos",
  "trackingPreview": "UNA VISTA DE TU SEGUIMIENTO",
  "openTracking": "Abrir el registro completo",
  "trackEyebrow": "TUS DATOS, CON CONTEXTO",
  "trackTitle": "Cada registro cuenta.",
  "trackDescription": "Reúne tus mediciones y resultados de laboratorio para conversar sobre ellos en tus controles.",
  "addRecord": "Añadir medición",
  "trendEyebrow": "TENDENCIA",
  "period": "Periodo",
  "sevenDays": "7 días",
  "thirtyDays": "30 días",
  "allTime": "Todo",
  "metric": "Medición",
  "readTogether": "LEERLOS EN CONJUNTO",
  "noSingleNumber": "Tu salud es más que un número.",
  "trackNote": "La tendencia ayuda a organizar la información. Una medición aislada no confirma ni descarta enfermedad renal.",
  "rangesNote": "Los colores y las bandas de referencia del ejemplo están pendientes de validación clínica. Tus metas deben ser individuales.",
  "viewReferences": "Ver referencias del ejemplo",
  "localOnly": "Guardado únicamente en este navegador.",
  "history": "HISTORIAL",
  "resultsTitle": "Tus resultados, en orden.",
  "exportCSV": "Exportar CSV",
  "clearRecords": "Borrar registros",
  "from": "Desde",
  "to": "Hasta",
  "resetDates": "Quitar filtro",
  "resultsDisclaimer": "Valores orientativos: no sustituyen una valoración médica. Las comparaciones de color se habilitan para registros personales cuando el equipo de salud valide las referencias.",
  "todayRecipe": "UNA IDEA PARA REVISAR",
  "foodTeaserTitle": "Cocinar también puede ser sencillo.",
  "foodTeaserDescription": "Encuentra preparaciones de ejemplo para conversar con tu nutricionista. Las porciones y los ingredientes se ajustan a cada persona.",
  "openRecipes": "Explorar recetas",
  "nextVisit": "EN TU PRÓXIMA CONSULTA",
  "askTeam": "Preguntas que vale la pena llevar.",
  "foodEyebrow": "SABOR, CUIDADO Y CONTEXTO",
  "foodTitle": "Ideas para tu mesa.",
  "foodDescription": "Un recetario de ejemplo para revisar con el equipo de salud, pensado como punto de partida.",
  "dietNote": "No existe una dieta renal única. Las cantidades de proteína, potasio, fósforo, sodio y líquidos se ajustan a tu función renal y tus resultados. Todas estas recetas requieren validación.",
  "searchRecipe": "Buscar una receta o ingrediente",
  "lessSalt": "Ideas con menos sal",
  "onlyFavorites": "Mis favoritas",
  "mealFilter": "Tipo de comida",
  "sodiumNote": "«Menos sal» identifica ideas sin sal añadida con ingredientes frescos; no es una declaración nutricional de bajo sodio. Revisa etiquetas y porciones.",
  "habitsEyebrow": "EL CUIDADO SE CONSTRUYE",
  "habitsTitle": "Pequeños pasos. Cada día.",
  "habitsDescription": "Registra los hábitos que forman parte de tu plan. La constancia empieza con lo que sí puedes hacer.",
  "weekProgress": "TU SEMANA",
  "streakLabel": "días seguidos con algún hábito registrado",
  "habitTargets": "Metas iniciales de ejemplo: actividad 5 días; los demás hábitos 7. Ajusta la frecuencia con tu equipo de salud.",
  "previousWeek": "Semana anterior",
  "nextWeek": "Semana siguiente",
  "habitHint": "Marca cada día que cumplas un hábito. Puedes corregirlo tocándolo de nuevo.",
  "clearWeek": "Limpiar semana",
  "yourPace": "A tu ritmo, con acompañamiento.",
  "habitNote": "Adapta la actividad a tu condición y consulta antes de cambiar tu rutina. No aumentes líquidos ni proteínas sin orientación profesional.",
  "readPrevention": "Leer sobre prevención",
  "signsEyebrow": "OBSERVAR SIN AUTODIAGNOSTICARSE",
  "signsTitle": "Escucha las señales.",
  "signsDescription": "Los síntomas pueden tener distintas causas. Saber distinguirlos ayuda a buscar atención y preparar una consulta.",
  "silentTitle": "El daño temprano puede ser silencioso.",
  "silentNote": "Sentirte bien no descarta un problema renal. La sangre y la orina permiten evaluar cambios antes de que sean evidentes.",
  "selfCheckEyebrow": "PREPARA TU CONSULTA",
  "selfCheckTitle": "¿Qué has notado?",
  "selfCheckDescription": "Marca lo que ocurre ahora. Esta herramienta organiza señales; no calcula riesgo ni establece un diagnóstico.",
  "symptomsPrivacy": "Las selecciones no se guardan.",
  "checkSymptoms": "Ver orientación",
  "projectEyebrow": "CONOCIMIENTO QUE CONECTA",
  "projectTitle": "Distintas miradas. Un mismo cuidado.",
  "projectDescription": "Un proyecto COIL que reúne diseño, tecnología y educación en salud para acercar el cuidado renal a más personas.",
  "sourcesTitle": "Fuentes y revisión.",
  "contentReview": "Revisión académica pendiente",
  "footerProject": "PROYECTO COIL / SALUD RENAL",
  "footerNote": "Educación para comprender. Acompañamiento profesional para decidir.",
  "credits": "Proyecto, créditos y fuentes",
  "personalRecord": "REGISTRO PERSONAL",
  "newRecord": "Nueva medición.",
  "close": "Cerrar",
  "recordHelp": "Introduce al menos una medición. Copia las unidades de tus resultados; no calculamos la filtración a partir de la creatinina.",
  "cancel": "Cancelar",
  "saveRecord": "Guardar medición",
  "referenceTitle": "Metas con contexto.",
  "delete": "Borrar",
  "presentation": "Presentación",
  "exitPresentation": "Salir de presentación",
  "previous": "Anterior",
  "next": "Continuar",
  "presentationHint": "Usa ← → para navegar · Esc para salir",
  "demoMode": "DATOS DE DEMOSTRACIÓN",
  "realMode": "MIS REGISTROS",
  "demoDescription": "Ejemplos ficticios. No pertenecen a una persona.",
  "realDescription": "Tus mediciones personales, separadas del ejemplo.",
  "showReal": "Ver mis registros",
  "showDemo": "Ver ejemplo",
  "noRecords": "Todavía no hay mediciones.",
  "noRecordsHint": "Añade un registro o explora los datos de demostración.",
  "noFilteredRecords": "No hay mediciones en este periodo.",
  "noChartData": "No hay valores de esta medición en el periodo.",
  "chartSampleBand": "Banda del ejemplo · sin validar",
  "chartNoBand": "Sin meta individual configurada",
  "chartRecords": "{count} valores registrados",
  "chartDelta": "Cambio: {delta} {unit} entre el primer y el último registro.",
  "chartSingle": "Un valor: hacen falta más registros para ver una tendencia.",
  "chartAccessible": "Tendencia de {metric}. {summary}",
  "date": "Fecha",
  "glucose": "Glucosa en ayunas",
  "hba1c": "HbA1c",
  "systolic": "Presión sistólica",
  "diastolic": "Presión diastólica",
  "creatinine": "Creatinina",
  "egfr": "TFGe (filtración estimada)",
  "uacr": "Albúmina/creatinina en orina",
  "weight": "Peso",
  "glucoseShort": "Glucosa",
  "bloodPressure": "Presión arterial",
  "status": "Referencia",
  "actions": "Acciones",
  "reviewPending": "Por valorar",
  "exampleWithin": "Ejemplo: dentro del rango",
  "exampleAttention": "Ejemplo: atención",
  "exampleConsult": "Ejemplo: consultar",
  "referenceWithin": "Dentro de la referencia",
  "referenceAttention": "Revisar con el equipo",
  "referenceConsult": "Consultar al médico",
  "deleteRecord": "Borrar medición del {date}",
  "recordSaved": "Medición guardada en este navegador.",
  "saveFailed": "No se pudo guardar. Revisa el espacio o los permisos de tu navegador.",
  "invalidRecord": "Revisa la fecha e introduce al menos una medición válida.",
  "futureRecord": "La fecha no puede estar en el futuro.",
  "pressurePair": "Introduce ambas cifras de presión; la sistólica debe superar a la diastólica.",
  "invalidDates": "La fecha inicial debe ser anterior o igual a la final.",
  "dateRequired": "Fecha de la medición",
  "optional": "Opcional",
  "savedMeasurements": "{count} mediciones personales",
  "deleteTitle": "¿Borrar estos registros?",
  "deleteDescription": "Se eliminarán de este navegador. Exporta una copia CSV si quieres conservarlos.",
  "deleteOneDescription": "Se eliminará esta medición de este navegador.",
  "deleted": "Registros borrados.",
  "emptyExport": "No hay registros visibles para exportar.",
  "exported": "CSV exportado.",
  "demoClearNote": "Los ejemplos no se borran. Cambia a Mis registros para borrar datos personales.",
  "referencesDisclaimer": "Estas bandas y reglas son ejemplos de interfaz, no metas personales ni umbrales diagnósticos. Los indicadores personales están desactivados hasta su validación por el equipo de salud.",
  "referencesIndividual": "Creatinina y peso no tienen una referencia universal. Los resultados renales requieren contexto, evolución y evaluación clínica.",
  "recipesFound": "{count} preparaciones de ejemplo",
  "noRecipes": "No encontramos preparaciones con esos filtros.",
  "clearRecipeFilters": "Quitar filtros",
  "allMeals": "Todas",
  "breakfast": "Desayuno",
  "lunch": "Almuerzo",
  "dinner": "Cena",
  "snack": "Merienda",
  "recipeExample": "Ejemplo por validar con el equipo de salud",
  "reviewNutritionist": "Para revisar con nutricionista",
  "recipeOpen": "Ver preparación",
  "minutes": "min",
  "servings": "{count} porciones de ejemplo",
  "saveFavorite": "Guardar favorita: {title}",
  "removeFavorite": "Quitar favorita: {title}",
  "favoriteSaved": "Receta guardada en favoritas.",
  "favoriteRemoved": "Receta retirada de favoritas.",
  "ingredients": "Ingredientes",
  "preparation": "Preparación",
  "reviewNote": "Revisar antes de preparar",
  "weekCompleted": "{done} de {total} registros de hábito de la meta semanal.",
  "feedbackStart": "Un primer paso basta.",
  "feedbackSome": "Estás construyendo constancia.",
  "feedbackGood": "Tus cuidados tienen su espacio.",
  "feedbackComplete": "Tu semana está registrada.",
  "habitColumn": "Hábito",
  "habitDay": "{habit}, {date}",
  "futureDay": "Día futuro",
  "weekClearTitle": "¿Limpiar esta semana?",
  "weekClearDescription": "Se quitarán las marcas de esta semana. Las otras semanas se conservan.",
  "habitUpdated": "Hábito actualizado.",
  "alertUrgent": "Busca atención de urgencias ahora.",
  "alertUrgentNote": "La dificultad intensa para respirar o la confusión repentina requieren atención urgente, cualquiera que sea la causa. Contacta los servicios de emergencia de tu localidad.",
  "alertVisit": "Contacta a tu equipo de salud.",
  "alertVisitNote": "Comenta estas señales, especialmente si son nuevas, persistentes o empeoran. Si se vuelven intensas, busca atención urgente. No cambies tus medicamentos por tu cuenta.",
  "alertNone": "Mantén tus controles programados.",
  "alertNoneNote": "No marcar síntomas no descarta daño renal. Consulta sobre las pruebas de sangre y orina que te corresponden.",
  "sourceLabel": "Fuente",
  "year": "Año",
  "population": "Población",
  "pendingSource": "[fuente por confirmar]",
  "pendingYear": "[año por confirmar]",
  "pendingPopulation": "[población por confirmar]",
  "draftStat": "CIFRA DEL BORRADOR / NO VALIDADA",
  "draftEstimate": "Estimación propuesta por el equipo; no usar como prevalencia global verificada.",
  "globalView": "Perspectiva global",
  "globalNote": "La frecuencia cambia según país, población y definición de enfermedad renal. Estas cifras no se deben extrapolar a todas las personas con diabetes.",
  "mexico": "México",
  "usComparison": "Referencia disponible: Estados Unidos",
  "usNumber": "≈ 1 de cada 3",
  "usPopulation": "Adultos con diabetes en Estados Unidos; referencia CDC 2019 citada por NIDDK.",
  "labReminder": "La evaluación combina pruebas de sangre y orina, y cambios a lo largo del tiempo.",
  "educationCTA": "Organizar mis cuidados",
  "knowledgeNote": "Información educativa. Revisión final con el equipo académico y de salud.",
  "slideLearning": "COMPRENDER",
  "slideCare": "CUIDAR",
  "slideTrack": "REGISTRAR",
  "slideFood": "ADAPTAR",
  "slideConnect": "COLABORAR",
  "slideDemoNote": "Gráfica de demostración con datos ficticios. No se muestran registros personales.",
  "slideQuestion": "¿Qué podemos hacer hoy para cuidar los riñones de mañana?",
  "slideGo": "Ir a diapositiva {number}",
  "presentationEnd": "Fin de la presentación",
  "sourceChecked": "Consultada el 6 de octubre de 2026",
  "notClinical": "Prototipo educativo, sin diagnóstico ni prescripción.",
  "storageWarning": "El navegador no permite guardar datos. Los cambios no se conservarán al cerrar.",
  "fieldUnits": "Introduce el valor en {unit}.",
  "symptomsSelected": "Señales seleccionadas: {count}.",
  "filterBlood": "Sangre que llega",
  "filterMembrane": "Barrera de filtrado",
  "filterUrine": "Hacia la orina",
  "filterProtein": "Proteínas",
  "filterWaste": "Agua y desechos",
  "filterDiagramLabel": "Esquema del paso de agua, desechos y proteínas por una barrera de filtrado.",
  "pageTitle": "Renal · Proyecto COIL",
  "pageDescription": "Educación sobre diabetes y salud renal: explora, aprende y organiza tus cuidados.",
  "weekRange": "{start} — {end}",
  "recordDateHint": "Usa la fecha del examen o de la medición.",
  "demoTableNote": "Las etiquetas de color son ejemplos de interfaz sin validación clínica.",
  "personalTableNote": "Interpretación pendiente con tu equipo de salud.",
  "slideSources": "Fuentes, créditos y contenido revisable en la sección Proyecto.",
  "sourcePendingDisclaimer": "Las cifras de 2–4 de cada 10 y 1 de cada 4 en México provienen del borrador del equipo. Falta confirmar fuente, año y población.",
  "recipeCardNote": "POR VALIDAR",
  "habitSource": "Meta de actividad del borrador: 30 minutos en 5 días, adaptada a tu condición. CDC recomienda 150 minutos semanales para muchos adultos.",
  "glucoseFormHint": "Resultado en ayunas, según las indicaciones de tu equipo.",
  "egfrFormHint": "Copia la TFGe del laboratorio. No es el valor de creatinina.",
  "uacrFormHint": "Solo relación albúmina/creatinina en mg/g; no albúmina en mg/L.",
  "formUnitsNote": "Si tu laboratorio usa otras unidades, consulta antes de introducir los resultados.",
  "sourceLink": "Leer fuente",
  "optionalInputs": "Los campos sin dato pueden dejarse vacíos.",
  "savedSuccessTitle": "Datos personales",
  "educationAffects": "Puede afectar a personas con diabetes tipo 1 y tipo 2, en cualquier país.",
  "showAllResults": "Ver resultados",
  "filterStageAccessible": "Cambio conceptual {number} de 4",
  "studyTeam": "EQUIPO COIL",
  "sourceTable": "Referencias de contenido",
  "clearFilters": "Limpiar filtros",
  "visitQuestion1": "¿Cuáles son mis metas de glucosa y presión?",
  "visitQuestion2": "¿Cuándo debo repetir mis pruebas de sangre y orina?",
  "visitQuestion3": "¿Debo ajustar mi alimentación o los líquidos?",
  "ingredientNotFound": "Prueba con otro ingrediente o tipo de comida.",
  "selectedPart": "Estructura seleccionada",
  "formRangeError": "Revisa las unidades y los valores introducidos.",
  "signsDisclaimer": "No esperes al resultado de esta herramienta si sientes que necesitas atención urgente.",
  "openProject": "Conocer el proyecto",
  "slideKidneyDescription": "Los riñones eliminan desechos y agua de la sangre. La diabetes y la presión alta pueden afectar sus pequeños vasos.",
  "slideLabDescription": "La evaluación del riñón combina albúmina en la orina y una estimación del filtrado en sangre.",
  "slidePreventionDescription": "Glucosa y presión, medicamentos indicados, actividad adaptada y controles. Un cuidado cotidiano acompañado por tu equipo.",
  "slideFoodDescription": "No existe una receta adecuada para todas las personas. La función renal y los resultados orientan los ajustes.",
  "slideHabitsDescription": "Registrar los pequeños pasos hace visible la constancia, sin sustituir el plan de tu equipo de salud.",
  "slideThanks": "Aprender juntos para cuidar mejor.",
  "emptyHabitsLabel": "Sin registros de hábitos esta semana.",
  "glucoseChartLabel": "Glucosa en ayunas (mg/dL)",
  "printUnits": "Unidades",
  "validationPending": "Validación clínica pendiente",
  "slidePress": "Presentación educativa",
  "sourceNoDate": "Fecha de revisión por confirmar",
  "nutritionAmount": "Las cantidades son ejemplos de preparación, no una prescripción de porciones.",
  "profileNone": "Los perfiles se guardan sin cifrado en este navegador. Cualquier persona con acceso al navegador puede leerlos. No son cuentas privadas.",
  "recipeShortBadge": "EJEMPLO",
  "noFavoriteYet": "Guarda una receta con el corazón para verla aquí.",
  "habitWeeklyGoal": "Meta: {count} días",
  "tableFullData": "Tabla completa de mediciones",
  "resultsCount": "{count} registros visibles",
  "allMetrics": "Todas las mediciones",
  "viewSource": "Ver fuente",
  "stepLabel": "PASO {number}",
  "slideOf": "{current} / {total}",
  "sourceScope": "Alcance de la fuente",
  "futureNote": "Los días futuros se habilitan cuando llega la fecha.",
  "resetComplete": "Semana limpiada.",
  "demoNoSave": "El ejemplo no altera tus datos personales.",
  "unitsDisclaimer": "Comprueba que las unidades coincidan con el laboratorio.",
  "slideCreditLabel": "COLABORACIÓN ENTRE UNIVERSIDADES",
  "parts": [
    {
      "id": "corteza",
      "title": "Corteza renal",
      "description": "La capa externa. Contiene estructuras donde empieza el filtrado de la sangre."
    },
    {
      "id": "medula",
      "title": "Médula renal",
      "description": "La región interna. Sus túbulos ayudan a concentrar la orina y recuperar agua y sustancias que el cuerpo necesita."
    },
    {
      "id": "glomerulo",
      "title": "Glomérulo",
      "description": "Un pequeño conjunto de vasos que actúa como filtro. El agua y desechos pasan; las proteínas grandes suelen permanecer en la sangre."
    },
    {
      "id": "ureter",
      "title": "Uréter",
      "description": "El conducto que lleva la orina del riñón a la vejiga. No lleva sangre."
    },
    {
      "id": "arteria",
      "title": "Arteria renal",
      "description": "El vaso que lleva sangre al riñón. La glucosa elevada y la presión alta pueden dañar vasos pequeños del sistema de filtrado."
    }
  ],
  "filterStages": [
    {
      "title": "Una barrera que selecciona.",
      "description": "En un filtrado conservado, pasan agua y moléculas pequeñas. Las células de la sangre y la mayoría de proteínas grandes permanecen en la circulación."
    },
    {
      "title": "Los pequeños vasos reciben presión.",
      "description": "La glucosa alta sostenida y la presión elevada pueden afectar las estructuras del filtro. Al principio puede no haber síntomas."
    },
    {
      "title": "Algunas proteínas pueden atravesar.",
      "description": "Cuando la barrera se altera, puede aumentar la albúmina en la orina. Se mide mediante una prueba; no se confirma mirando la orina."
    },
    {
      "title": "El filtrado puede disminuir.",
      "description": "Si el daño progresa, el riñón puede eliminar menos desechos. La evolución se evalúa con pruebas repetidas y contexto clínico; puede frenarse con cuidados y tratamiento."
    }
  ],
  "sections": [
    {
      "id": "causas",
      "tab": "Causas y riesgos",
      "eyebrow": "01 / COMPRENDER",
      "title": "¿Por qué ocurre el daño renal?",
      "description": "La nefropatía diabética es un daño renal relacionado con la diabetes tipo 1 o tipo 2. La glucosa elevada durante mucho tiempo puede afectar los pequeños vasos del riñón.",
      "pointsTitle": "Factores que pueden aumentar el riesgo",
      "points": [
        "Más años con diabetes y glucosa elevada de forma sostenida.",
        "Presión arterial alta, colesterol y triglicéridos elevados.",
        "Edad, antecedentes familiares de enfermedad renal y lesión renal previa.",
        "Fumar, sedentarismo, exceso de sal y obesidad."
      ],
      "note": "El riesgo puede reducirse: controlar la glucosa y la presión, seguir el tratamiento y asistir a controles ayuda a proteger los riñones.",
      "sources": [
        "niddk-dkd",
        "mayo"
      ]
    },
    {
      "id": "epidemiologia",
      "tab": "¿A quiénes afecta?",
      "eyebrow": "02 / PERSPECTIVA GLOBAL",
      "title": "La prevención empieza por entender el contexto.",
      "description": "La enfermedad renal es una complicación importante de la diabetes en todo el mundo. El riesgo cambia con los años de diabetes, la edad, el control de glucosa, la presión, el peso y los lípidos.",
      "pointsTitle": "Una cifra necesita contexto",
      "points": [
        "Comparar países exige conocer la población, el año y cómo se definió la enfermedad.",
        "Las cifras del borrador se muestran pendientes de verificación.",
        "Una estadística de población no predice la evolución de una persona."
      ],
      "note": "No todas las personas con diabetes desarrollan daño renal. Las cifras orientan el estudio del problema; los controles guían el cuidado personal.",
      "sources": [
        "niddk-dkd"
      ]
    },
    {
      "id": "prevencion",
      "tab": "Cómo cuidarte",
      "eyebrow": "03 / CUIDAR",
      "title": "El cuidado cotidiano puede hacer la diferencia.",
      "description": "La detección temprana y el cuidado de la diabetes pueden prevenir o retrasar complicaciones. El daño puede desarrollarse lentamente y sin señales evidentes.",
      "pointsTitle": "Cuidados para acordar con tu equipo",
      "points": [
        "Glucosa y presión: conoce tus metas y monitorea según indicación.",
        "Medicamentos: sigue el tratamiento prescrito y consulta antes de modificarlo.",
        "Sin tabaco ni vapeo; busca apoyo para dejarlo.",
        "Actividad adaptada: una meta posible es 30 minutos en 5 días. Incluye fuerza si tu equipo lo indica.",
        "Alimentación y líquidos: revisa la sal y adapta las cantidades a tus resultados.",
        "Controles: consulta sobre exámenes anuales en diabetes tipo 2 y tras 5 años de diabetes tipo 1, o antes si te lo indican."
      ],
      "note": "No es una garantía absoluta de prevención. La frecuencia de exámenes, el ejercicio y los objetivos deben ajustarse a cada persona.",
      "sources": [
        "niddk-dkd",
        "cdc-activity",
        "niddk-diet"
      ]
    },
    {
      "id": "manifestaciones",
      "tab": "Señales y exámenes",
      "eyebrow": "04 / DETECTAR",
      "title": "La respuesta también está en los exámenes.",
      "description": "En las primeras etapas puede haber pocos síntomas o ninguno. Los análisis de sangre y orina permiten valorar cómo trabajan los riñones.",
      "pointsTitle": "Dos pruebas que se complementan",
      "points": [
        "Sangre: la creatinina permite al laboratorio estimar la tasa de filtración glomerular (TFGe).",
        "Orina: la relación albúmina/creatinina ayuda a valorar la pérdida de proteínas.",
        "El equipo interpreta los resultados repetidos junto con la historia clínica.",
        "Sed y micción frecuente pueden acompañar a la diabetes; no confirman daño renal."
      ],
      "note": "Hinchazón, cambios en la orina o cansancio necesitan evaluación. No se deben confundir síntomas generales de diabetes con una confirmación de nefropatía.",
      "sources": [
        "niddk-tests",
        "cdc-signs",
        "mayo"
      ]
    }
  ],
  "symptomCategories": [
    {
      "title": "Síntomas generales de diabetes",
      "subtitle": "No son una prueba de daño renal.",
      "items": [
        "Sed y orinar con frecuencia",
        "Hambre extrema",
        "Cansancio y mareo",
        "Heridas que tardan en sanar"
      ]
    },
    {
      "title": "Señales que requieren valoración renal",
      "subtitle": "También pueden tener otras causas.",
      "items": [
        "Hinchazón de pies, piernas, manos o cara",
        "Orina espumosa o cambios de frecuencia, color u olor",
        "Náusea, falta de apetito o cansancio persistente"
      ]
    },
    {
      "title": "Otros efectos asociados a la diabetes",
      "subtitle": "Son complicaciones que se evalúan por separado.",
      "items": [
        "Presión alta y riesgo cardiovascular",
        "Cambios de visión",
        "Pérdida de sensibilidad en pies"
      ]
    },
    {
      "title": "Hallazgos de laboratorio",
      "subtitle": "Se detectan en sangre y orina.",
      "items": [
        "Albúmina o proteínas elevadas en orina",
        "Disminución de la filtración estimada",
        "Cambios progresivos en pruebas repetidas"
      ]
    }
  ],
  "symptomChecks": [
    {
      "id": "breathing",
      "text": "Dificultad intensa para respirar ahora",
      "urgent": true
    },
    {
      "id": "confusion",
      "text": "Confusión repentina o dificultad para mantenerse alerta",
      "urgent": true
    },
    {
      "id": "swelling",
      "text": "Hinchazón nueva o persistente",
      "urgent": false
    },
    {
      "id": "urine",
      "text": "Cambios persistentes en la orina",
      "urgent": false
    },
    {
      "id": "nausea",
      "text": "Náuseas, poco apetito o cansancio persistente",
      "urgent": false
    },
    {
      "id": "diabetes",
      "text": "Sed, micción frecuente o heridas que tardan en sanar",
      "urgent": false
    }
  ],
  "habits": [
    {
      "id": "activity",
      "title": "Actividad adaptada",
      "detail": "30 min, si está indicado",
      "target": 5
    },
    {
      "id": "tobacco",
      "title": "Sin tabaco ni vapeo",
      "detail": "Busca apoyo si lo necesitas",
      "target": 7
    },
    {
      "id": "glucose",
      "title": "Glucosa según mi plan",
      "detail": "Solo la frecuencia indicada",
      "target": 7
    },
    {
      "id": "medicine",
      "title": "Medicación indicada",
      "detail": "Según la prescripción",
      "target": 7
    },
    {
      "id": "salt",
      "title": "Atención a la sal",
      "detail": "Revisar etiquetas y preparaciones",
      "target": 7
    },
    {
      "id": "fluids",
      "title": "Líquidos según mi plan",
      "detail": "La cantidad que indicó mi equipo",
      "target": 7
    }
  ],
  "creditsBlocks": [
    {
      "number": "01",
      "title": "Diseño en colaboración",
      "text": "El mockup de Laura es el punto de partida: ilustración a la izquierda, información a la derecha, mediciones y recomendaciones. La nueva versión conserva esa lógica y amplía la interacción."
    },
    {
      "number": "02",
      "title": "Construcción del conocimiento",
      "text": "Las reuniones por Zoom y el trabajo entre universidades articulan información sobre causas, epidemiología, prevención y detección. El equipo completa la evidencia de reuniones y los nombres de participantes."
    },
    {
      "number": "03",
      "title": "Lenguaje que acerca",
      "text": "La versión en español y en inglés facilita compartir el proyecto. Ambas traducciones requieren revisión académica y de terminología por los equipos participantes."
    },
    {
      "number": "04",
      "title": "Lo que sigue",
      "text": "Confirmar las fuentes epidemiológicas, validar rangos individuales, aprobar recetas y completar los créditos. La publicación y el dominio se definirán al finalizar esta revisión."
    }
  ],
  "universities": [
    "Universidad Católica de Colombia",
    "Tecnológico de Monterrey",
    "Universidad de Florida"
  ],
  "creditReview": "Instituciones según la base del proyecto; confirmar denominaciones, integrantes y autorizaciones antes de publicar.",
  "kidneyTitle": "Riñón: esquema interactivo",
  "kidneyDescription": "Corte esquemático de un riñón. Cinco puntos permiten explorar corteza, médula, glomérulo, uréter y arteria.",
  "fullscreen": "Pantalla completa",
  "servingsOne": "1 porción de ejemplo",
  "recipesFoundOne": "1 preparación de ejemplo",
  "resultsCountOne": "1 registro visible",
  "chartRecordsOne": "1 valor registrado",
  "savedMeasurementsOne": "1 medición personal",
  "fullscreenUnavailable": "La pantalla completa no está disponible aquí. Usa la opción de pantalla completa del navegador; el visor puede seguir abierto.",
  "searchAll": "Buscar en el proyecto",
  "settings": "Ajustes",
  "theme": "Apariencia",
  "lightTheme": "Claro",
  "darkTheme": "Oscuro",
  "systemTheme": "Según el dispositivo",
  "motion": "Movimiento",
  "reduceMotion": "Reducir movimiento",
  "allowMotion": "Permitir movimiento, respetando el dispositivo",
  "systemMotion": "Según el dispositivo",
  "localProfile": "Perfil local",
  "newProfile": "Crear perfil",
  "profileName": "Nombre del perfil",
  "create": "Crear",
  "profileExport": "Exportar perfil JSON",
  "profileImport": "Importar perfil JSON",
  "profilePrivacy": "Los perfiles se guardan sin cifrado en este navegador. Cualquier persona con acceso al navegador puede leerlos. No son cuentas privadas.",
  "declaredEgfr": "TFGe declarada (opcional)",
  "declaredEgfrHint": "Copia el resultado que tu equipo confirmó, en mL/min/1.73 m². No se calcula aquí.",
  "saveSettings": "Guardar ajustes",
  "privacy": "Privacidad",
  "privacyTitle": "Tus datos, en este navegador.",
  "privacyBody": "Se guardan registros, notas, hábitos y favoritas hasta que los borres o limpies los datos del navegador. No se envían a un servidor. Las exportaciones quedan bajo tu control. Contacto del equipo: pendiente de confirmar. Las copias de migración se eliminan al borrar los datos completos del sitio en el navegador.",
  "deleteProfile": "Borrar este perfil",
  "deleteProfileHint": "Se borrará todo su historial local. Exporta antes si quieres conservarlo.",
  "welcomeTitle": "Conoce tu espacio de cuidado.",
  "welcomeStep": "Paso {current} de 3",
  "welcomeLanguage": "Elige cómo prefieres leer.",
  "welcomeMode": "Explora un ejemplo o empieza tu registro.",
  "welcomePrivacy": "Tu información permanece en este navegador.",
  "welcomeDemo": "Explorar el ejemplo ficticio",
  "welcomePersonal": "Empezar mis registros",
  "start": "Empezar",
  "shortcuts": "Atajos de teclado",
  "shortcutNav": "Ir a una sección: pulsa g y luego la letra",
  "shortcutPresentation": "Presentación · Esc para salir",
  "shortcutNotes": "Notas del presentador",
  "shortcutReset": "Reiniciar cronómetro",
  "shortcutPause": "Pausar o continuar cronómetro",
  "searchPlaceholder": "Busca una zona, receta o hábito…",
  "searchCount": "{count} resultados. Usa ↑ ↓ y Enter.",
  "searchEmpty": "Prueba con otro término.",
  "section": "Sección",
  "chapter": "Capítulo",
  "recipe": "Receta",
  "habit": "Hábito",
  "profileImported": "Perfil importado como una copia nueva.",
  "importConfirm": "Confirmar importación",
  "importPreview": "Revisa la importación",
  "importInvalid": "El archivo no es válido. No se han cambiado tus datos.",
  "importCSV": "Importar CSV",
  "importCSVHint": "Acepta CSV exportado por Renal. Revisa filas, unidades y procedencia antes de guardar.",
  "acceptedRows": "Filas aceptadas: {count}",
  "rejectedRows": "Filas rechazadas: {count}",
  "duplicates": "Coincidencias de fecha y métrica: {count}",
  "keepBoth": "Conservar ambas mediciones",
  "overwrite": "Sobrescribir las métricas coincidentes",
  "importOrigin": "Los ejemplos ficticios se excluyen del perfil personal.",
  "notes": "Notas",
  "recordNotesHint": "Máximo 280 caracteres. Evita información que no quieras dejar en un navegador compartido.",
  "tags": "Contexto de la medición",
  "tag-fasting": "Ayunas",
  "tag-post-dinner": "Después de cenar",
  "tag-visit": "En consulta",
  "allTags": "Todos los contextos",
  "compareDates": "Comparar dos registros",
  "firstRecord": "Registro inicial",
  "secondRecord": "Registro final",
  "comparisonResult": "Diferencia: {delta} {unit} · Variación: {percent}",
  "noPercent": "No calculable (valor inicial cero)",
  "compareHint": "La diferencia describe valores; no interpreta su significado clínico.",
  "quickGlucose": "Solo glucosa",
  "exportPDF": "Imprimir / guardar PDF",
  "consultation": "Preparar vista de consulta",
  "professionalNotes": "Notas para el profesional",
  "professionalHint": "Espacio opcional. Máximo 3000 caracteres.",
  "myStory": "Mi historia · últimos 30 días",
  "storyTitle": "Tu historia en datos.",
  "storyCount": "Registraste {count} entradas en los últimos 30 días.",
  "storyMetric": "{metric}: de {first} a {last} {unit}; diferencia {delta} {unit}.",
  "storyEnd": "Este resumen describe registros, sin evaluar su significado clínico. Revísalo con tu equipo de salud.",
  "exportText": "Exportar texto",
  "periodPrinted": "Periodo: {from} — {to}",
  "print": "Imprimir / guardar PDF",
  "printBlocked": "Permite ventanas emergentes para abrir la vista de impresión.",
  "servingsControl": "Porciones de ejemplo",
  "addShopping": "Añadir a mi lista de compras",
  "shoppingList": "Tu lista de compras",
  "shoppingEmpty": "Añade preparaciones desde su detalle.",
  "shoppingAdded": "Preparación añadida a la lista.",
  "shoppingClear": "Vaciar lista",
  "substitutions": "Sustituciones · por validar",
  "onlyUnvalidated": "Sin validar",
  "renalFoodWarning": "Tu perfil declara una TFGe menor de 60. Revisa con tu equipo cómo ajustar potasio, fósforo y porciones; esta lista no calcula requerimientos ni prescribe restricciones.",
  "weeklyView": "Semana",
  "monthlyView": "Mes",
  "dailyNote": "Nota del día",
  "saveNote": "Guardar nota",
  "noteSaved": "Nota guardada.",
  "habitStreak": "{count} días seguidos",
  "exportHabits": "Exportar hábitos CSV",
  "monthPrevious": "Mes anterior",
  "monthNext": "Mes siguiente",
  "monthlyHint": "Cada día muestra hábitos marcados. Selecciona una fecha para revisar marcas y nota.",
  "prepareVisit": "Preparar preguntas para mi consulta",
  "questionsTitle": "Para conversar con tu equipo.",
  "symptomQuestion": "¿Cómo debo evaluar esta señal: {symptom}? ¿Qué cambios debo observar y cuándo volver a consultar?",
  "urgentQuestions": "No retrases la atención urgente para preparar esta lista.",
  "notDiagnosis": "Orientación educativa · no es un diagnóstico",
  "urgentAlert": "ALERTA DE URGENCIA",
  "compareParts": "Comparar dos zonas",
  "comparisonPartA": "Primera zona",
  "comparisonPartB": "Segunda zona",
  "partFocus": "Explicación de la zona",
  "reviewQuiz": "Repaso · 5 preguntas",
  "quizTitle": "¿Qué aprendiste del riñón?",
  "checkAnswers": "Revisar respuestas",
  "quizScore": "{score} de 5. La puntuación no se guarda.",
  "quizCorrect": "Respuesta correcta",
  "quizTry": "Revisa la explicación de esta zona.",
  "beforeAfter": "Un cambio, visto por dentro.",
  "beforeLabel": "Filtrado conservado",
  "afterLabel": "Alteración conceptual",
  "conceptSlider": "Comparación conceptual del filtrado",
  "conceptTimeline": "Año {year} · conceptual",
  "conceptDisclaimer": "Ilustración conceptual: los años son marcadores narrativos, no una cronología clínica ni una predicción. La evolución puede variar y requiere evaluación profesional.",
  "presenterNotes": "Notas para quien presenta",
  "notesFullscreen": "Las notas se ocultan en pantalla completa nativa. En el visor de ventana, todos pueden verlas.",
  "presentationExport": "Exportar 9 escenas PDF",
  "timer": "Tiempo de exposición",
  "waitingTitle": "Aprender juntos para cuidar mejor.",
  "waitingHint": "Pulsa → para comenzar.",
  "install": "Instalar",
  "recoveryTitle": "Conservamos el estado anterior.",
  "recoveryHint": "No se pudo migrar. Descarga la copia original antes de reiniciar; tus datos todavía no se han sobrescrito.",
  "downloadBackup": "Descargar copia original",
  "restart": "Reiniciar después de respaldar",
  "profilePreview": "Perfil: {name} · {count} registros",
  "filterDates": "Fechas seleccionadas",
  "technicalReport": "Validación y límites del prototipo",
  "skipWelcome": "Saltar",
  "reviewQuestions": [
    {
      "question": "¿Qué zona lleva sangre al riñón?",
      "answer": "arteria"
    },
    {
      "question": "¿Qué conducto lleva la orina a la vejiga?",
      "answer": "ureter"
    },
    {
      "question": "¿Qué conjunto de pequeños vasos actúa como filtro?",
      "answer": "glomerulo"
    },
    {
      "question": "¿Cuál es la capa externa del riñón?",
      "answer": "corteza"
    },
    {
      "question": "¿Qué región contiene túbulos que ayudan a concentrar la orina?",
      "answer": "medula"
    }
  ],
  "statistics": [
    {
      "id": "global-draft",
      "display": "2–4 / 10",
      "sourceId": null,
      "source": null,
      "url": null,
      "year": null,
      "population": null,
      "methodology": null,
      "verified": false
    },
    {
      "id": "mexico-draft",
      "display": "1 / 4",
      "sourceId": null,
      "source": null,
      "url": null,
      "year": null,
      "population": null,
      "methodology": null,
      "verified": false
    },
    {
      "id": "us-reference",
      "display": "≈ 1 / 3",
      "sourceId": "niddk-dkd",
      "source": "NIDDK; referencia CDC 2019",
      "url": "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/diabetic-kidney-disease",
      "year": 2019,
      "population": "Adultos con diabetes en Estados Unidos",
      "methodology": null,
      "verified": true
    }
  ],
  "habitStreakOne": "1 día seguido",
  "perHabitStreakTitle": "Constancia, hábito por hábito.",
  "methodology": "Metodología",
  "pendingMethodology": "[metodología por confirmar]",
  "reviewContacts": {
    "clinicalReviewer": null,
    "nutritionReviewer": null,
    "englishReviewer": null,
    "coordinator": null,
    "teamMembers": []
  },
  "foodNoticeTitle": "Antes de elegir una receta",
  "shoppingEyebrow": "ORGANIZA TUS INGREDIENTES",
  "shoppingEmptyTitle": "Tu lista está lista para empezar",
  "shoppingClearHint": "Se quitarán todos los ingredientes de tu lista de compras.",
  "shoppingCleared": "Lista de compras vaciada.",
  "shoppingCount": "{count} ingredientes",
  "shoppingCountOne": "{count} ingrediente"
}
````

## data/fuentes.json

````json
[
  {
    "id": "niddk-dkd",
    "title": {
      "es": "NIDDK · Enfermedad renal relacionada con diabetes",
      "en": "NIDDK · Diabetic Kidney Disease"
    },
    "url": "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/diabetic-kidney-disease",
    "scope": {
      "es": "Causas, riesgos, cuidados y pruebas; cifra estadounidense con referencia CDC 2019.",
      "en": "Causes, risks, care and tests; US figure citing CDC 2019."
    },
    "reviewDate": "2017-02 / CDC 2019",
    "accessed": "2026-10-06"
  },
  {
    "id": "niddk-tests",
    "title": {
      "es": "NIDDK · Pruebas y diagnóstico renal",
      "en": "NIDDK · Kidney Tests and Diagnosis"
    },
    "url": "https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd/tests-diagnosis",
    "scope": {
      "es": "Pruebas de sangre y orina; interpretación de filtración y albúmina.",
      "en": "Blood and urine tests; filtration and albumin assessment."
    },
    "reviewDate": null,
    "accessed": "2026-10-06"
  },
  {
    "id": "niddk-diet",
    "title": {
      "es": "NIDDK · Alimentación y enfermedad renal",
      "en": "NIDDK · Nutrition and Kidney Disease"
    },
    "url": "https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd/healthy-eating-adults-chronic-kidney-disease",
    "scope": {
      "es": "Necesidades individuales de proteína, líquidos, potasio, fósforo y sodio.",
      "en": "Individual needs for protein, fluids, potassium, phosphorus and sodium."
    },
    "reviewDate": null,
    "accessed": "2026-10-06"
  },
  {
    "id": "mayo",
    "title": {
      "es": "Mayo Clinic · Nefropatía diabética",
      "en": "Mayo Clinic · Diabetic Nephropathy"
    },
    "url": "https://www.mayoclinic.org/diseases-conditions/diabetic-nephropathy/symptoms-causes/syc-20354556",
    "scope": {
      "es": "Síntomas, factores de riesgo y función de las estructuras renales.",
      "en": "Symptoms, risk factors and kidney structure function."
    },
    "reviewDate": null,
    "accessed": "2026-10-06"
  },
  {
    "id": "cdc-signs",
    "title": {
      "es": "CDC · Síntomas de diabetes",
      "en": "CDC · Diabetes Symptoms"
    },
    "url": "https://www.cdc.gov/diabetes/signs-symptoms/index.html",
    "scope": {
      "es": "Síntomas generales de diabetes, separados de enfermedad renal.",
      "en": "General diabetes symptoms, distinguished from kidney disease."
    },
    "reviewDate": null,
    "accessed": "2026-10-06"
  },
  {
    "id": "cdc-activity",
    "title": {
      "es": "CDC · Actividad física y diabetes",
      "en": "CDC · Physical Activity and Diabetes"
    },
    "url": "https://www.cdc.gov/diabetes/living-with/physical-activity.html",
    "scope": {
      "es": "Meta orientativa de 150 minutos semanales; adaptación con el médico.",
      "en": "Illustrative goal of 150 minutes weekly; adapt with your clinician."
    },
    "reviewDate": "2024-05-15",
    "accessed": "2026-10-06"
  },
  {
    "id": "medline",
    "title": {
      "es": "MedlinePlus · Enfermedad renal crónica",
      "en": "MedlinePlus · Chronic Kidney Disease"
    },
    "url": "https://medlineplus.gov/ency/article/000471.htm",
    "scope": {
      "es": "Manifestaciones y necesidad de valoración profesional.",
      "en": "Symptoms and need for professional assessment."
    },
    "reviewDate": null,
    "accessed": "2026-10-06"
  }
]
````

## data/presentacion.json

````json
{
  "es": [
    "Presenta el proyecto COIL y la colaboración entre universidades. Aclara que la ilustración es un esquema educativo.",
    "Explica cómo diabetes y presión alta pueden afectar los vasos pequeños. La ausencia de síntomas no sustituye las pruebas.",
    "Mueve la comparación conceptual en la página antes de presentar. Los años del explorador no predicen una evolución individual.",
    "Distingue creatinina, TFGe y relación albúmina/creatinina. El registro copia resultados, no calcula diagnósticos.",
    "La actividad se adapta al plan individual. Las metas del borrador requieren revisión clínica.",
    "Esta gráfica siempre usa valores ficticios. Muestra cómo se organizan las fechas, sin interpretar resultados personales.",
    "Las ocho recetas son ejemplos sin validar. Enseña el control de porciones y la lista de compras; no presentes nutrientes como aprobados.",
    "Demuestra la semana, el mes y las notas. Las marcas reflejan registros del usuario, no cumplimiento clínico certificado.",
    "Cierra con fuentes y próximos pasos: revisión clínica, nutrición, inglés y créditos. El sitio todavía no está publicado."
  ],
  "en": [
    "Introduce the COIL project and university collaboration. Explain that the illustration is an educational schematic.",
    "Explain how diabetes and high blood pressure can affect small vessels. No symptoms does not replace testing.",
    "Explore the conceptual comparison on the page before presenting. The explorer's year labels do not predict individual progression.",
    "Distinguish creatinine, eGFR and urine albumin-to-creatinine ratio. The tracker copies results, not diagnoses.",
    "Activity should fit each person's plan. The draft goals require clinical review.",
    "This chart always uses fictional values. Show how dates are organized without interpreting personal results.",
    "All eight recipes are unvalidated examples. Show servings and the shopping list; do not present nutrients as approved.",
    "Demonstrate week, month and notes. Marks represent user records, not certified clinical adherence.",
    "Close with sources and next steps: clinical, nutrition, English and credits review. The site has not been published."
  ]
}
````

## data/rangos.json

````json
{
  "schemaVersion": 1,
  "clinicalValidation": {
    "approved": false,
    "reviewer": null,
    "reviewDate": null,
    "scope": "Ejemplos de interfaz; sin metas personales. Activar únicamente tras validación documentada del equipo de salud."
  },
  "metrics": {
    "glucose": {
      "unit": "mg/dL",
      "technicalMin": 1,
      "technicalMax": 2000,
      "step": 0.1,
      "exampleBand": [
        80,
        130
      ],
      "exampleRules": {
        "within": [
          80,
          130
        ],
        "attention": [
          70,
          180
        ]
      },
      "sourceId": null
    },
    "hba1c": {
      "unit": "%",
      "technicalMin": 0.1,
      "technicalMax": 30,
      "step": 0.1,
      "exampleBand": [
        4,
        7
      ],
      "exampleRules": {
        "within": [
          4,
          7
        ],
        "attention": [
          3,
          9
        ]
      },
      "sourceId": null
    },
    "systolic": {
      "unit": "mmHg",
      "technicalMin": 1,
      "technicalMax": 350,
      "step": 1,
      "exampleBand": [
        90,
        130
      ],
      "exampleRules": {
        "within": [
          90,
          130
        ],
        "attention": [
          80,
          160
        ]
      },
      "sourceId": null
    },
    "diastolic": {
      "unit": "mmHg",
      "technicalMin": 1,
      "technicalMax": 250,
      "step": 1,
      "exampleBand": [
        60,
        80
      ],
      "exampleRules": {
        "within": [
          60,
          80
        ],
        "attention": [
          50,
          100
        ]
      },
      "sourceId": null
    },
    "creatinine": {
      "unit": "mg/dL",
      "technicalMin": 0.01,
      "technicalMax": 50,
      "step": 0.01,
      "exampleBand": null,
      "exampleRules": null,
      "sourceId": null
    },
    "egfr": {
      "unit": "mL/min/1.73 m²",
      "technicalMin": 0,
      "technicalMax": 250,
      "step": 0.1,
      "exampleBand": [
        60,
        120
      ],
      "exampleRules": {
        "within": [
          60,
          250
        ],
        "attention": [
          30,
          59.999
        ]
      },
      "sourceId": null
    },
    "uacr": {
      "unit": "mg/g",
      "technicalMin": 0,
      "technicalMax": 30000,
      "step": 0.1,
      "exampleBand": [
        0,
        30
      ],
      "exampleRules": {
        "within": [
          0,
          29.999
        ],
        "attention": [
          30,
          300
        ]
      },
      "sourceId": null
    },
    "weight": {
      "unit": "kg",
      "technicalMin": 0.1,
      "technicalMax": 600,
      "step": 0.1,
      "exampleBand": null,
      "exampleRules": null,
      "sourceId": null
    }
  },
  "notes": [
    "Límites technicalMin/Max detectan errores de captura: no son rangos fisiológicos ni metas clínicas.",
    "Las bandas y reglas son datos de demostración sin validar; no aplicarlas a registros reales.",
    "Una cifra aislada de TFGe o albúmina no establece un diagnóstico."
  ]
}
````

## data/recetas.json

````json
[
  {
    "id": "avena",
    "meal": "breakfast",
    "minutes": 12,
    "servings": 1,
    "lessSaltIdea": true,
    "status": "sample-unvalidated",
    "es": {
      "title": "Avena con manzana y canela",
      "ingredients": [
        "⅓ taza de avena",
        "½ manzana en cubos",
        "Agua según textura",
        "Canela al gusto"
      ],
      "steps": [
        "Cocina la avena con agua a fuego bajo.",
        "Añade la manzana y la canela. Cocina hasta que se ablande."
      ],
      "note": "Revisar porción de carbohidratos y aporte de fósforo y potasio. No añadir azúcar.",
      "substitutions": [
        "Propuesta: pera en lugar de manzana; revisar aporte y porción antes del cambio."
      ]
    },
    "en": {
      "title": "Oats with apple and cinnamon",
      "ingredients": [
        "⅓ cup oats",
        "½ diced apple",
        "Water as needed for texture",
        "Cinnamon to taste"
      ],
      "steps": [
        "Cook oats with water over low heat.",
        "Add apple and cinnamon. Cook until soft."
      ],
      "note": "Review carbohydrate portion, phosphorus and potassium. Do not add sugar.",
      "substitutions": [
        "Proposal: pear instead of apple; review nutrient content and portion before changing."
      ]
    },
    "ingredientAmounts": [
      {
        "amount": 0.3333333333333333,
        "es": "taza de avena",
        "en": "cup oats",
        "esPlural": "tazas de avena",
        "enPlural": "cups oats"
      },
      {
        "amount": 0.5,
        "es": "manzana en cubos",
        "en": "diced apple",
        "esPlural": "manzanas en cubos",
        "enPlural": "diced apples"
      },
      {
        "amount": null,
        "es": "Agua según textura",
        "en": "Water as needed for texture",
        "esPlural": "Agua según textura",
        "enPlural": "Water as needed for texture"
      },
      {
        "amount": null,
        "es": "Canela al gusto",
        "en": "Cinnamon to taste",
        "esPlural": "Canela al gusto",
        "enPlural": "Cinnamon to taste"
      }
    ],
    "validatedBy": null,
    "validatedAt": null,
    "nutrientAnalysis": {
      "kcal": null,
      "proteinG": null,
      "sodiumMg": null,
      "potassiumMg": null,
      "phosphorusMg": null
    }
  },
  {
    "id": "pollo",
    "meal": "lunch",
    "minutes": 25,
    "servings": 2,
    "lessSaltIdea": true,
    "status": "sample-unvalidated",
    "es": {
      "title": "Pollo al limón con hierbas",
      "ingredients": [
        "160 g de pollo fresco sin piel",
        "Jugo de ½ limón",
        "1 cucharadita de aceite de oliva",
        "Hierbas frescas y pimienta"
      ],
      "steps": [
        "Mezcla limón, aceite y hierbas.",
        "Cocina el pollo completamente en sartén o al horno.",
        "Sirve la porción acordada con tu equipo."
      ],
      "note": "Ajustar la porción de proteína. Elegir pollo sin marinados ni fosfatos añadidos.",
      "substitutions": [
        "Propuesta: hierbas frescas en lugar de un marinado comercial; revisar ingredientes."
      ]
    },
    "en": {
      "title": "Lemon and herb chicken",
      "ingredients": [
        "160 g fresh skinless chicken",
        "Juice of ½ lemon",
        "1 tsp olive oil",
        "Fresh herbs and pepper"
      ],
      "steps": [
        "Mix lemon, oil and herbs.",
        "Cook the chicken thoroughly in a pan or oven.",
        "Serve the portion agreed on with your team."
      ],
      "note": "Adjust the protein portion. Choose chicken without added marinades or phosphates.",
      "substitutions": [
        "Proposal: fresh herbs instead of a commercial marinade; review ingredients."
      ]
    },
    "ingredientAmounts": [
      {
        "amount": 160,
        "es": "g de pollo fresco sin piel",
        "en": "g fresh skinless chicken",
        "esPlural": "g de pollo fresco sin piel",
        "enPlural": "g fresh skinless chicken"
      },
      {
        "amount": 0.5,
        "es": "limón (jugo)",
        "en": "lemon (juice)",
        "esPlural": "limones (jugo)",
        "enPlural": "lemons (juice)"
      },
      {
        "amount": 1,
        "es": "cucharadita de aceite de oliva",
        "en": "tsp olive oil",
        "esPlural": "cucharaditas de aceite de oliva",
        "enPlural": "tsp olive oil"
      },
      {
        "amount": null,
        "es": "Hierbas frescas y pimienta",
        "en": "Fresh herbs and pepper",
        "esPlural": "Hierbas frescas y pimienta",
        "enPlural": "Fresh herbs and pepper"
      }
    ],
    "validatedBy": null,
    "validatedAt": null,
    "nutrientAnalysis": {
      "kcal": null,
      "proteinG": null,
      "sodiumMg": null,
      "potassiumMg": null,
      "phosphorusMg": null
    }
  },
  {
    "id": "arroz",
    "meal": "lunch",
    "minutes": 20,
    "servings": 2,
    "lessSaltIdea": true,
    "status": "sample-unvalidated",
    "es": {
      "title": "Arroz con calabacín y perejil",
      "ingredients": [
        "½ taza de arroz crudo",
        "½ calabacín pequeño",
        "1 cucharadita de aceite",
        "Perejil fresco"
      ],
      "steps": [
        "Cocina el arroz sin cubos de caldo.",
        "Saltea el calabacín y mezcla con el arroz.",
        "Añade perejil fresco."
      ],
      "note": "Ajustar carbohidratos, tamaño de porción y vegetales según potasio.",
      "substitutions": [
        "Propuesta: otra verdura disponible en lugar de calabacín; elección y cantidad con el equipo."
      ]
    },
    "en": {
      "title": "Rice with zucchini and parsley",
      "ingredients": [
        "½ cup uncooked rice",
        "½ small zucchini",
        "1 tsp oil",
        "Fresh parsley"
      ],
      "steps": [
        "Cook rice without stock cubes.",
        "Sauté zucchini and mix with rice.",
        "Add fresh parsley."
      ],
      "note": "Adjust carbohydrate intake, portion size and vegetables according to potassium.",
      "substitutions": [
        "Proposal: another available vegetable instead of zucchini; choose type and amount with your team."
      ]
    },
    "ingredientAmounts": [
      {
        "amount": 0.5,
        "es": "taza de arroz crudo",
        "en": "cup uncooked rice",
        "esPlural": "tazas de arroz crudo",
        "enPlural": "cups uncooked rice"
      },
      {
        "amount": 0.5,
        "es": "calabacín pequeño",
        "en": "small zucchini",
        "esPlural": "calabacines pequeños",
        "enPlural": "small zucchinis"
      },
      {
        "amount": 1,
        "es": "cucharadita de aceite",
        "en": "tsp oil",
        "esPlural": "cucharaditas de aceite",
        "enPlural": "tsp oil"
      },
      {
        "amount": null,
        "es": "Perejil fresco",
        "en": "Fresh parsley",
        "esPlural": "Perejil fresco",
        "enPlural": "Fresh parsley"
      }
    ],
    "validatedBy": null,
    "validatedAt": null,
    "nutrientAnalysis": {
      "kcal": null,
      "proteinG": null,
      "sodiumMg": null,
      "potassiumMg": null,
      "phosphorusMg": null
    }
  },
  {
    "id": "pepino",
    "meal": "snack",
    "minutes": 8,
    "servings": 2,
    "lessSaltIdea": true,
    "status": "sample-unvalidated",
    "es": {
      "title": "Pepino fresco con limón",
      "ingredients": [
        "1 pepino pequeño",
        "Jugo de ¼ limón",
        "Hierbas frescas al gusto"
      ],
      "steps": [
        "Lava el pepino y córtalo.",
        "Añade limón y hierbas justo antes de servir."
      ],
      "note": "Revisar tolerancia, cantidad de vegetales y necesidades de potasio.",
      "substitutions": [
        "Propuesta: hierbas frescas en lugar de un aderezo comercial; revisar cantidad y tolerancia."
      ]
    },
    "en": {
      "title": "Fresh cucumber with lemon",
      "ingredients": [
        "1 small cucumber",
        "Juice of ¼ lemon",
        "Fresh herbs to taste"
      ],
      "steps": [
        "Wash and slice the cucumber.",
        "Add lemon and herbs just before serving."
      ],
      "note": "Review tolerance, vegetable quantity and potassium needs.",
      "substitutions": [
        "Proposal: fresh herbs instead of commercial dressing; review amount and tolerance."
      ]
    },
    "ingredientAmounts": [
      {
        "amount": 1,
        "es": "pepino pequeño",
        "en": "small cucumber",
        "esPlural": "pepinos pequeños",
        "enPlural": "small cucumbers"
      },
      {
        "amount": 0.25,
        "es": "limón (jugo)",
        "en": "lemon (juice)",
        "esPlural": "limones (jugo)",
        "enPlural": "lemons (juice)"
      },
      {
        "amount": null,
        "es": "Hierbas frescas al gusto",
        "en": "Fresh herbs to taste",
        "esPlural": "Hierbas frescas al gusto",
        "enPlural": "Fresh herbs to taste"
      }
    ],
    "validatedBy": null,
    "validatedAt": null,
    "nutrientAnalysis": {
      "kcal": null,
      "proteinG": null,
      "sodiumMg": null,
      "potassiumMg": null,
      "phosphorusMg": null
    }
  },
  {
    "id": "pescado",
    "meal": "dinner",
    "minutes": 30,
    "servings": 2,
    "lessSaltIdea": true,
    "status": "sample-unvalidated",
    "es": {
      "title": "Pescado al horno con ajo suave",
      "ingredients": [
        "160 g de pescado fresco",
        "1 diente de ajo pequeño",
        "1 cucharadita de aceite de oliva",
        "Limón y hierbas"
      ],
      "steps": [
        "Coloca el pescado en una fuente de horno.",
        "Añade ajo, limón, aceite y hierbas.",
        "Hornea hasta que esté completamente cocido."
      ],
      "note": "Revisar porción de proteína, fósforo y procedencia del pescado.",
      "substitutions": [
        "Propuesta: cambiar las hierbas según disponibilidad; revisar tolerancia y preparación."
      ]
    },
    "en": {
      "title": "Baked fish with mild garlic",
      "ingredients": [
        "160 g fresh fish",
        "1 small garlic clove",
        "1 tsp olive oil",
        "Lemon and herbs"
      ],
      "steps": [
        "Place fish in a baking dish.",
        "Add garlic, lemon, oil and herbs.",
        "Bake until fully cooked."
      ],
      "note": "Review protein portion, phosphorus and fish source.",
      "substitutions": [
        "Proposal: use different herbs based on availability; review tolerance and preparation."
      ]
    },
    "ingredientAmounts": [
      {
        "amount": 160,
        "es": "g de pescado fresco",
        "en": "g fresh fish",
        "esPlural": "g de pescado fresco",
        "enPlural": "g fresh fish"
      },
      {
        "amount": 1,
        "es": "diente de ajo pequeño",
        "en": "small garlic clove",
        "esPlural": "dientes de ajo pequeños",
        "enPlural": "small garlic cloves"
      },
      {
        "amount": 1,
        "es": "cucharadita de aceite de oliva",
        "en": "tsp olive oil",
        "esPlural": "cucharaditas de aceite de oliva",
        "enPlural": "tsp olive oil"
      },
      {
        "amount": null,
        "es": "Limón y hierbas",
        "en": "Lemon and herbs",
        "esPlural": "Limón y hierbas",
        "enPlural": "Lemon and herbs"
      }
    ],
    "validatedBy": null,
    "validatedAt": null,
    "nutrientAnalysis": {
      "kcal": null,
      "proteinG": null,
      "sodiumMg": null,
      "potassiumMg": null,
      "phosphorusMg": null
    }
  },
  {
    "id": "tostada",
    "meal": "breakfast",
    "minutes": 10,
    "servings": 1,
    "lessSaltIdea": false,
    "status": "sample-unvalidated",
    "es": {
      "title": "Tostada con huevo y hierbas",
      "ingredients": [
        "1 rebanada de pan",
        "1 huevo",
        "Hierbas frescas",
        "Aceite para la sartén"
      ],
      "steps": [
        "Tuesta el pan.",
        "Cocina completamente el huevo con las hierbas.",
        "Sirve sobre el pan."
      ],
      "note": "Revisar sodio del pan, carbohidratos y aporte de proteína y fósforo del huevo.",
      "substitutions": [
        "Propuesta: otra variedad de pan; comparar etiquetas y revisar la porción."
      ]
    },
    "en": {
      "title": "Toast with egg and herbs",
      "ingredients": [
        "1 slice of bread",
        "1 egg",
        "Fresh herbs",
        "Oil for the pan"
      ],
      "steps": [
        "Toast the bread.",
        "Fully cook the egg with herbs.",
        "Serve on the bread."
      ],
      "note": "Review bread sodium, carbohydrates and the egg’s protein and phosphorus.",
      "substitutions": [
        "Proposal: a different bread variety; compare labels and review portion size."
      ]
    },
    "ingredientAmounts": [
      {
        "amount": 1,
        "es": "rebanada de pan",
        "en": "slice of bread",
        "esPlural": "rebanadas de pan",
        "enPlural": "slices of bread"
      },
      {
        "amount": 1,
        "es": "huevo",
        "en": "egg",
        "esPlural": "huevos",
        "enPlural": "eggs"
      },
      {
        "amount": null,
        "es": "Hierbas frescas",
        "en": "Fresh herbs",
        "esPlural": "Hierbas frescas",
        "enPlural": "Fresh herbs"
      },
      {
        "amount": null,
        "es": "Aceite para la sartén",
        "en": "Oil for the pan",
        "esPlural": "Aceite para la sartén",
        "enPlural": "Oil for the pan"
      }
    ],
    "validatedBy": null,
    "validatedAt": null,
    "nutrientAnalysis": {
      "kcal": null,
      "proteinG": null,
      "sodiumMg": null,
      "potassiumMg": null,
      "phosphorusMg": null
    }
  },
  {
    "id": "coliflor",
    "meal": "dinner",
    "minutes": 22,
    "servings": 2,
    "lessSaltIdea": true,
    "status": "sample-unvalidated",
    "es": {
      "title": "Coliflor al horno con especias",
      "ingredients": [
        "1 taza de coliflor en floretes",
        "1 cucharadita de aceite de oliva",
        "Pimentón dulce y hierbas"
      ],
      "steps": [
        "Lava y corta la coliflor.",
        "Mezcla con aceite y especias.",
        "Hornea hasta que esté tierna."
      ],
      "note": "Revisar potasio y porción. No usar sustitutos de sal con cloruro de potasio.",
      "substitutions": [
        "Propuesta: perejil en lugar de pimentón; revisar tolerancia y cantidades."
      ]
    },
    "en": {
      "title": "Roasted cauliflower with spices",
      "ingredients": [
        "1 cup cauliflower florets",
        "1 tsp olive oil",
        "Sweet paprika and herbs"
      ],
      "steps": [
        "Wash and cut cauliflower.",
        "Mix with oil and spices.",
        "Roast until tender."
      ],
      "note": "Review potassium and portion size. Avoid salt substitutes containing potassium chloride.",
      "substitutions": [
        "Proposal: parsley instead of paprika; review tolerance and amounts."
      ]
    },
    "ingredientAmounts": [
      {
        "amount": 1,
        "es": "taza de coliflor en floretes",
        "en": "cup cauliflower florets",
        "esPlural": "tazas de coliflor en floretes",
        "enPlural": "cups cauliflower florets"
      },
      {
        "amount": 1,
        "es": "cucharadita de aceite de oliva",
        "en": "tsp olive oil",
        "esPlural": "cucharaditas de aceite de oliva",
        "enPlural": "tsp olive oil"
      },
      {
        "amount": null,
        "es": "Pimentón dulce y hierbas",
        "en": "Sweet paprika and herbs",
        "esPlural": "Pimentón dulce y hierbas",
        "enPlural": "Sweet paprika and herbs"
      }
    ],
    "validatedBy": null,
    "validatedAt": null,
    "nutrientAnalysis": {
      "kcal": null,
      "proteinG": null,
      "sodiumMg": null,
      "potassiumMg": null,
      "phosphorusMg": null
    }
  },
  {
    "id": "pera",
    "meal": "snack",
    "minutes": 15,
    "servings": 1,
    "lessSaltIdea": true,
    "status": "sample-unvalidated",
    "es": {
      "title": "Pera tibia con canela",
      "ingredients": [
        "½ pera",
        "Canela al gusto",
        "Agua para la cocción"
      ],
      "steps": [
        "Corta la pera en gajos.",
        "Cocina con un poco de agua y canela hasta que esté tierna."
      ],
      "note": "Revisar carbohidratos, potasio y porción de fruta. No añadir miel ni azúcar.",
      "substitutions": [
        "Propuesta: otra fruta aprobada en tu plan; confirmar cantidades con el equipo."
      ]
    },
    "en": {
      "title": "Warm pear with cinnamon",
      "ingredients": [
        "½ pear",
        "Cinnamon to taste",
        "Water for cooking"
      ],
      "steps": [
        "Cut pear into wedges.",
        "Cook with a little water and cinnamon until tender."
      ],
      "note": "Review carbohydrates, potassium and fruit portion. Do not add honey or sugar.",
      "substitutions": [
        "Proposal: another fruit approved in your plan; confirm amounts with your team."
      ]
    },
    "ingredientAmounts": [
      {
        "amount": 0.5,
        "es": "pera",
        "en": "pear",
        "esPlural": "peras",
        "enPlural": "pears"
      },
      {
        "amount": null,
        "es": "Canela al gusto",
        "en": "Cinnamon to taste",
        "esPlural": "Canela al gusto",
        "enPlural": "Cinnamon to taste"
      },
      {
        "amount": null,
        "es": "Agua para la cocción",
        "en": "Water for cooking",
        "esPlural": "Agua para la cocción",
        "enPlural": "Water for cooking"
      }
    ],
    "validatedBy": null,
    "validatedAt": null,
    "nutrientAnalysis": {
      "kcal": null,
      "proteinG": null,
      "sodiumMg": null,
      "potassiumMg": null,
      "phosphorusMg": null
    }
  }
]
````

## eslint.config.js

````javascript
// Solo reglas de correctitud. No impone un estilo de formato.
const globals=Object.fromEntries(['window','document','location','localStorage','navigator','console','crypto','fetch','matchMedia','URL','Blob','CustomEvent','Element','HTMLDialogElement','IntersectionObserver','MutationObserver','ResizeObserver','requestAnimationFrame','cancelAnimationFrame','setTimeout','clearTimeout','setInterval','clearInterval','performance','FormData','structuredClone','process','Buffer','__dirname','require','module'].map(name=>[name,'readonly']));
export default [{ignores:['node_modules/**','Abrir_sin_instalar.html']},{files:['js/**/*.js','tests/**/*.js','tools/*.cjs','eslint.config.js'],languageOptions:{ecmaVersion:'latest',sourceType:'module',globals},rules:{'no-unused-vars':['error',{argsIgnorePattern:'^_'}],'no-undef':'error','no-implicit-globals':'error'}},{files:['tools/*.cjs'],languageOptions:{sourceType:'commonjs'}}];
````

## index.html

````html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#146d88">
  <meta name="description" content="Una experiencia educativa sobre diabetes y salud renal. Explora, aprende y organiza tus cuidados con el proyecto COIL.">
  <meta property="og:title" content="Renal · Proyecto COIL">
  <meta property="og:description" content="Comprender tus riñones es el primer paso para cuidarlos. Educación, seguimiento y hábitos.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="assets/social.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Renal / COIL. Tu salud renal, vista de cerca; esquema educativo del riñón.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Renal · Proyecto COIL">
  <meta name="twitter:description" content="Explora, aprende y organiza tus cuidados. Educación sobre diabetes y salud renal.">
  <meta name="twitter:image" content="assets/social.png">
  <title>Renal · Proyecto COIL</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/extensions.css">
  <link rel="stylesheet" href="css/visual.css">
  <link rel="preload" href="assets/fonts/texto.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/editorial.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/editorial-italic.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body>
  <a class="skip-link" href="#main" data-i18n="skip">Ir al contenido</a>
  <div class="reading-progress" aria-hidden="true"><span id="reading-progress"></span></div>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="#descubrir">
        <svg viewBox="0 0 32 36" width="28" height="32" aria-hidden="true"><path d="M19 3C4 1-1 22 10 31c7 6 15-1 11-8-6-1-7-8-2-11 5-2 5-8 0-9Z" fill="currentColor"/><path d="M19 15c6 0 8 7 8 16" fill="none" stroke="currentColor" stroke-width="2"/></svg>
        <span class="brand-name">renal<span class="brand-project">COIL / 2026</span></span>
      </a>
      <nav id="main-nav" aria-label="Navegación principal" data-i18n-aria="mainNav">
        <a href="#descubrir" data-route="descubrir"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4M11 8v6m-3-3h6"/></svg><span data-i18n="navDiscover">Descubrir</span></a>
        <a href="#seguimiento" data-route="seguimiento"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V4m0 16h16M7 15l4-5 4 3 5-7"/></svg><span data-i18n="navTrack">Mi seguimiento</span></a>
        <a href="#alimentacion" data-route="alimentacion"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3v7m-3-7v5a3 3 0 0 0 6 0V3M6 11v10m12-18c-3 3-3 7 0 8V3Zm0 8v10"/></svg><span data-i18n="navFood">Alimentación</span></a>
        <a href="#habitos" data-route="habitos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5"/></svg><span data-i18n="navHabits">Hábitos</span></a>
        <a href="#senales" data-route="senales"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-5 6 8 15 8 15S25 11 20 5Z"/><path d="M4 12h5l2-4 3 7 2-3h4"/></svg><span data-i18n="navSigns">Señales</span></a>
      </nav>
      <div class="header-tools">
        <div class="language-control" role="group" aria-label="Idioma" data-i18n-aria="language"><button type="button" data-lang="es" aria-pressed="true">ES</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div>
        <button id="open-presentation" class="icon-button" data-i18n-aria="present" aria-label="Modo presentación"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 4h18M5 4v12h14V4M12 16v5m-4 0 4-3 4 3"/></svg></button>
        <button id="mobile-menu" class="icon-button mobile-only" aria-controls="main-nav" aria-expanded="false" data-i18n-aria="menu" aria-label="Abrir menú"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      </div>
    </div>
    <div id="workspace-strip-placeholder" class="workspace-strip" aria-hidden="true"></div>
  </header>
  <main id="main" tabindex="-1">
    <section class="route page-shell" id="route-descubrir" data-view="descubrir">
      <div class="section-topline"><span data-i18n="discoverEyebrow">DIABETES Y SALUD RENAL</span><span class="topline-note" data-i18n="academic">EXPERIENCIA EDUCATIVA / COIL</span></div>
      <div class="discovery-grid">
        <div class="discovery-copy">
          <p class="eyebrow" data-i18n="heroEyebrow">COMPRENDER PARA CUIDAR</p>
          <h1><span data-i18n="heroTitle">Tu salud renal,</span><br><em data-i18n="heroAccent">vista de cerca.</em></h1>
          <p class="hero-description" data-i18n="heroDescription">Un espacio para entender cómo la diabetes puede afectar tus riñones y qué puedes hacer para cuidarlos, cada día.</p>
          <div class="hero-actions"><button class="button primary" id="explore-filter" data-i18n="compareFilter">Comparar el filtrado</button><a class="text-link" href="#seguimiento" data-i18n="startTracking">Ver mi seguimiento</a></div>
          <div class="hero-message"><span class="message-symbol" aria-hidden="true">+</span><p data-i18n="heroMessage">Tener diabetes no significa que tus riñones se dañarán. El seguimiento y los cuidados pueden reducir el riesgo.</p></div>
          <div class="hero-footnote"><span data-i18n="exploreHint">Toca los puntos del riñón para explorar.</span><span data-i18n="fiveParts">5 estructuras</span></div>
        </div>
        <div class="kidney-studio">
          <div class="studio-heading"><span class="small-label" data-i18n="anatomy">01 / ANATOMÍA INTERACTIVA</span><span class="small-label" data-i18n="schematic">ESQUEMA EDUCATIVO</span></div>
          <div id="kidney-visual" class="kidney-visual"></div>
          <div class="studio-caption"><span class="caption-index" id="part-index">01</span><div><h2 id="part-title"></h2><p id="part-description"></p></div></div>
          <div id="part-buttons" class="part-buttons" role="group" data-i18n-aria="exploreParts" aria-label="Explorar partes del riñón"></div>
          <div class="studio-tools"></div>
        </div>
      </div>
      <section id="filter-comparison" class="filter-section" hidden aria-labelledby="filter-title">
        <div class="section-heading"><div><p class="eyebrow" data-i18n="filterEyebrow">UN FILTRO, MUCHOS CUIDADOS</p><h2 id="filter-title" data-i18n="filterTitle">Lo que cambia en el filtrado</h2></div><button class="icon-button" id="close-filter" data-i18n-aria="closeComparison" aria-label="Cerrar comparación">×</button></div>
        <div class="filter-grid"><div class="filter-diagram" id="filter-diagram"></div><div class="filter-controls"><span class="tag" data-i18n="illustrative">Simulación conceptual</span><h3 id="filter-stage-title"></h3><p id="filter-stage-description"></p><label for="filter-stage" data-i18n="progression">Explora los cambios</label><input type="range" id="filter-stage" min="0" max="3" step="1" value="0"><div class="range-labels"><span data-i18n="filterHealthy">Filtrado conservado</span><span data-i18n="filterAffected">Filtrado afectado</span></div><p class="fine-print" data-i18n="filterDisclaimer">No representa etapas clínicas, porcentajes de función ni la evolución de una persona. El daño no es inevitable.</p></div></div>
      </section>
      <section class="education-section" aria-labelledby="education-title"><div class="section-heading"><div><p class="eyebrow" data-i18n="educationEyebrow">EL CONOCIMIENTO TAMBIÉN CUIDA</p><h2 id="education-title" data-i18n="educationTitle">Entiende lo esencial.</h2></div><span class="small-label" data-i18n="fourChapters">CUATRO CAPÍTULOS</span></div><div class="education-tabs" id="education-tabs" role="tablist" data-i18n-aria="chapters" aria-label="Capítulos sobre salud renal"></div><div id="education-panel" class="education-panel" role="tabpanel" tabindex="0"></div></section>
      <div class="discovery-bottom"><div class="daily-note"><span class="card-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5"/></svg></span><p class="eyebrow" data-i18n="dailyStep">UN PASO PARA HOY</p><h2 data-i18n="dailyTitle">Haz espacio para tus cuidados.</h2><p data-i18n="dailyDescription">Organiza tus mediciones, revisa una idea para cocinar y registra los hábitos que acordaste con tu equipo de salud.</p><a class="button primary" href="#habitos" data-i18n="viewHabits">Ver mis hábitos</a></div><div class="mini-tracking"><p class="eyebrow" data-i18n="trackingPreview">UNA VISTA DE TU SEGUIMIENTO</p><div id="home-tracking"></div><a class="text-link" href="#seguimiento" data-i18n="openTracking">Abrir el registro completo</a></div></div>
    </section>
    <section class="route page-shell" id="route-seguimiento" data-view="seguimiento" hidden>
      <div class="page-intro"><div><p class="eyebrow" data-i18n="trackEyebrow">TUS DATOS, CON CONTEXTO</p><h1 data-i18n="trackTitle">Cada registro cuenta.</h1><p data-i18n="trackDescription">Reúne tus mediciones y resultados de laboratorio para conversar sobre ellos en tus controles.</p></div><button class="button primary" id="add-record" data-i18n="addRecord">Añadir medición</button></div>
      <div class="data-mode-bar"><div><span class="tag demo-tag" id="data-mode-tag"></span><span id="data-mode-description"></span></div><button class="text-link" id="toggle-demo"></button></div>
      <div class="tracking-layout"><section class="chart-surface" aria-labelledby="chart-heading"><div class="chart-toolbar"><div><p class="eyebrow" data-i18n="trendEyebrow">TENDENCIA</p><h2 id="chart-heading"></h2></div><div class="period-control" role="group" data-i18n-aria="period" aria-label="Periodo"><button data-period="7" aria-pressed="false" data-i18n="sevenDays">7 días</button><button data-period="30" aria-pressed="true" data-i18n="thirtyDays">30 días</button><button data-period="all" aria-pressed="false" data-i18n="allTime">Todo</button></div></div><div class="metric-summary"><div><strong id="latest-value">—</strong><span id="metric-unit"></span></div><p id="metric-delta"></p></div><div id="trend-chart" class="trend-chart"></div><div class="chart-footer"><span id="chart-caption"></span><select id="metric-select" data-i18n-aria="metric" aria-label="Medición"></select></div></section><aside class="tracking-aside"><p class="eyebrow" data-i18n="readTogether">LEERLOS EN CONJUNTO</p><h2 data-i18n="noSingleNumber">Tu salud es más que un número.</h2><p data-i18n="trackNote">La tendencia ayuda a organizar la información. Una medición aislada no confirma ni descarta enfermedad renal.</p><div class="aside-rule"></div><p data-i18n="rangesNote">Los colores y las bandas de referencia del ejemplo están pendientes de validación clínica. Tus metas deben ser individuales.</p><button id="show-ranges" class="text-link" data-i18n="viewReferences">Ver referencias del ejemplo</button><span class="local-label" data-i18n="localOnly">Guardado únicamente en este navegador.</span></aside></div>
      <section class="results-section" aria-labelledby="results-title"><div class="section-heading"><div><p class="eyebrow" data-i18n="history">HISTORIAL</p><h2 id="results-title" data-i18n="resultsTitle">Tus resultados, en orden.</h2></div><div class="table-actions"><button class="button secondary" id="export-csv" data-i18n="exportCSV">Exportar CSV</button><button class="text-link danger-text" id="clear-records" data-i18n="clearRecords">Borrar registros</button></div></div><div class="date-filters"><label><span data-i18n="from">Desde</span><input id="date-from" type="date"></label><label><span data-i18n="to">Hasta</span><input id="date-to" type="date"></label><button class="text-link" id="reset-dates" data-i18n="resetDates">Quitar filtro</button></div><div id="results-table" class="table-scroll"></div><p class="fine-print" data-i18n="resultsDisclaimer">Valores orientativos: no sustituyen una valoración médica. Las comparaciones de color se habilitan para registros personales cuando el equipo de salud valide las referencias.</p></section>
      <div class="support-grid"><section class="food-teaser"><p class="eyebrow" data-i18n="todayRecipe">UNA IDEA PARA REVISAR</p><h2 data-i18n="foodTeaserTitle">Cocinar también puede ser sencillo.</h2><p data-i18n="foodTeaserDescription">Encuentra preparaciones de ejemplo para conversar con tu nutricionista. Las porciones y los ingredientes se ajustan a cada persona.</p><a href="#alimentacion" class="button secondary" data-i18n="openRecipes">Explorar recetas</a></section><section class="next-visit"><p class="eyebrow" data-i18n="nextVisit">EN TU PRÓXIMA CONSULTA</p><h2 data-i18n="askTeam">Preguntas que vale la pena llevar.</h2><ul id="visit-questions"></ul></section></div>
    </section>
    <section class="route page-shell" id="route-alimentacion" data-view="alimentacion" hidden><div class="page-intro"><div><p class="eyebrow" data-i18n="foodEyebrow">SABOR, CUIDADO Y CONTEXTO</p><h1 data-i18n="foodTitle">Ideas para tu mesa.</h1><p data-i18n="foodDescription">Un recetario de ejemplo para revisar con el equipo de salud, pensado como punto de partida.</p></div><span class="intro-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3v7m-3-7v5a3 3 0 0 0 6 0V3M6 11v10m12-18c-3 3-3 7 0 8V3Zm0 8v10"/></svg></span></div><aside class="notice food-notice"><div class="notice-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z"/><path d="M12 8v5m0 3v1"/></svg></div><div class="notice-content"><strong data-i18n="foodNoticeTitle">Antes de elegir una receta</strong><p data-i18n="dietNote">No existe una dieta renal única. Las cantidades de proteína, potasio, fósforo, sodio y líquidos se ajustan a tu función renal y tus resultados. Todas estas recetas requieren validación.</p></div></aside><div class="recipe-toolbar"><label class="search-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input id="recipe-search" type="search" data-i18n-placeholder="searchRecipe" data-i18n-aria="searchRecipe" placeholder="Buscar una receta o ingrediente" aria-label="Buscar una receta o ingrediente"></label><div class="recipe-toggle-filters"><label><input id="recipe-sodium" type="checkbox"><span data-i18n="lessSalt">Ideas con menos sal</span></label><label><input id="recipe-favorites" type="checkbox"><span data-i18n="onlyFavorites">Mis favoritas</span></label></div></div><div class="recipe-meal-filters" id="recipe-meal-filters" role="group" data-i18n-aria="mealFilter" aria-label="Tipo de comida"></div><div class="recipe-count" id="recipe-count" role="status"></div><div id="recipe-grid" class="recipe-grid"></div><p class="fine-print" data-i18n="sodiumNote">«Menos sal» identifica ideas sin sal añadida con ingredientes frescos; no es una declaración nutricional de bajo sodio. Revisa etiquetas y porciones.</p></section>
    <section class="route page-shell" id="route-habitos" data-view="habitos" hidden><div class="page-intro"><div><p class="eyebrow" data-i18n="habitsEyebrow">EL CUIDADO SE CONSTRUYE</p><h1 data-i18n="habitsTitle">Pequeños pasos. Cada día.</h1><p data-i18n="habitsDescription">Registra los hábitos que forman parte de tu plan. La constancia empieza con lo que sí puedes hacer.</p></div><span class="intro-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5"/></svg></span></div><div class="habits-layout"><aside class="habit-score"><p class="small-label" data-i18n="weekProgress">TU SEMANA</p><div class="progress-orbit"><svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="86" class="orbit-track"/><circle cx="100" cy="100" r="86" class="orbit-value" id="habit-progress-circle"/></svg><strong id="habit-percent">0<small>%</small></strong></div><h2 id="habit-feedback"></h2><p id="habit-progress-text"></p><div class="streak-box"><strong id="habit-streak">0</strong><span data-i18n="streakLabel">días seguidos con algún hábito registrado</span></div><p class="fine-print" data-i18n="habitTargets">Metas iniciales de ejemplo: actividad 5 días; los demás hábitos 7. Ajusta la frecuencia con tu equipo de salud.</p></aside><section class="week-surface" aria-labelledby="week-title"><div class="week-toolbar"><button id="week-prev" class="icon-button" data-i18n-aria="previousWeek" aria-label="Semana anterior">‹</button><h2 id="week-title"></h2><button id="week-next" class="icon-button" data-i18n-aria="nextWeek" aria-label="Semana siguiente">›</button></div><div id="habit-grid" class="habit-grid"></div><div class="week-bottom"><p data-i18n="habitHint">Marca cada día que cumplas un hábito. Puedes corregirlo tocándolo de nuevo.</p><button id="clear-week" class="text-link danger-text" data-i18n="clearWeek">Limpiar semana</button></div></section></div><div class="habit-bottom"><h2 data-i18n="yourPace">A tu ritmo, con acompañamiento.</h2><p data-i18n="habitNote">Adapta la actividad a tu condición y consulta antes de cambiar tu rutina. No aumentes líquidos ni proteínas sin orientación profesional.</p><a class="text-link" href="#descubrir/prevencion" data-i18n="readPrevention">Leer sobre prevención</a></div></section>
    <section class="route page-shell" id="route-senales" data-view="senales" hidden><div class="page-intro"><div><p class="eyebrow" data-i18n="signsEyebrow">OBSERVAR SIN AUTODIAGNOSTICARSE</p><h1 data-i18n="signsTitle">Escucha las señales.</h1><p data-i18n="signsDescription">Los síntomas pueden tener distintas causas. Saber distinguirlos ayuda a buscar atención y preparar una consulta.</p></div><span class="intro-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-5 6 8 15 8 15S25 11 20 5Z"/><path d="M4 12h5l2-4 3 7 2-3h4"/></svg></span></div><div class="early-detection"><strong data-i18n="silentTitle">El daño temprano puede ser silencioso.</strong><p data-i18n="silentNote">Sentirte bien no descarta un problema renal. La sangre y la orina permiten evaluar cambios antes de que sean evidentes.</p></div><div id="symptom-categories" class="symptom-categories"></div><section class="self-check" aria-labelledby="self-check-title"><div><p class="eyebrow" data-i18n="selfCheckEyebrow">PREPARA TU CONSULTA</p><h2 id="self-check-title" data-i18n="selfCheckTitle">¿Qué has notado?</h2><p data-i18n="selfCheckDescription">Marca lo que ocurre ahora. Esta herramienta organiza señales; no calcula riesgo ni establece un diagnóstico.</p><p class="fine-print" data-i18n="symptomsPrivacy">Las selecciones no se guardan.</p></div><div><div id="symptom-checks" class="symptom-checks"></div><button id="check-symptoms" class="button primary" data-i18n="checkSymptoms">Ver orientación</button><div id="symptom-result" class="symptom-result" role="status" hidden></div></div></section><p class="medical-source" id="signs-sources"></p></section>
    <section class="route page-shell" id="route-proyecto" data-view="proyecto" hidden><div class="page-intro"><div><p class="eyebrow" data-i18n="projectEyebrow">CONOCIMIENTO QUE CONECTA</p><h1 data-i18n="projectTitle">Distintas miradas.<br>Un mismo cuidado.</h1><p data-i18n="projectDescription">Un proyecto COIL que reúne diseño, tecnología y educación en salud para acercar el cuidado renal a más personas.</p></div><span class="intro-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2"/></svg></span></div><div id="credits-content"></div><section class="sources-section"><div class="section-heading"><h2 data-i18n="sourcesTitle">Fuentes y revisión.</h2><span class="tag" data-i18n="contentReview">Revisión académica pendiente</span></div><div id="source-list"></div></section></section>
  </main>
  <footer class="site-footer"><div class="footer-brand"><span class="brand-name">renal</span><p data-i18n="footerProject">PROYECTO COIL / SALUD RENAL</p></div><p data-i18n="footerNote">Educación para comprender. Acompañamiento profesional para decidir.</p><a href="#proyecto" data-i18n="credits">Proyecto, créditos y fuentes</a></footer>
  <dialog id="record-dialog" class="sheet-dialog" aria-labelledby="record-dialog-title"><form id="record-form"><div class="dialog-heading"><div><p class="eyebrow" data-i18n="personalRecord">REGISTRO PERSONAL</p><h2 id="record-dialog-title" data-i18n="newRecord">Nueva medición.</h2></div><button class="icon-button" type="button" data-close-dialog="record-dialog" data-i18n-aria="close" aria-label="Cerrar">×</button></div><p class="dialog-intro" data-i18n="recordHelp">Introduce al menos una medición. Copia las unidades de tus resultados; no calculamos la filtración a partir de la creatinina.</p><div class="form-grid" id="record-fields"></div><p id="record-error" class="form-error" role="alert"></p><div class="dialog-actions"><button type="button" class="button secondary" data-close-dialog="record-dialog" data-i18n="cancel">Cancelar</button><button type="submit" class="button primary" data-i18n="saveRecord">Guardar medición</button></div></form></dialog>
  <dialog id="recipe-dialog" class="recipe-dialog" aria-labelledby="recipe-dialog-title"><div id="recipe-detail"></div></dialog>
  <dialog id="reference-dialog" class="reference-dialog" aria-labelledby="reference-title"><div class="dialog-heading"><h2 id="reference-title" data-i18n="referenceTitle">Metas con contexto.</h2><button class="icon-button" data-close-dialog="reference-dialog" data-i18n-aria="close" aria-label="Cerrar">×</button></div><div id="reference-content"></div></dialog>
  <dialog id="confirm-dialog" class="confirm-dialog" aria-labelledby="confirm-title"><div class="confirm-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/></svg></div><h2 id="confirm-title"></h2><p id="confirm-description"></p><div class="dialog-actions"><button class="button secondary" id="confirm-cancel" data-i18n="cancel">Cancelar</button><button class="button danger" id="confirm-accept" data-i18n="delete">Borrar</button></div></dialog>
  <dialog id="presentation-dialog" class="presentation-dialog" aria-label="Presentación" data-i18n-aria="presentation"><div class="presentation-top"><span class="presentation-brand">renal / COIL</span><span id="slide-counter"></span><div style="display:flex;align-items:center;gap:1rem"><button id="fullscreen-presentation" class="text-link" data-i18n="fullscreen">Pantalla completa</button><button id="close-presentation" class="icon-button" data-i18n-aria="exitPresentation" aria-label="Salir de presentación">×</button></div></div><div id="presentation-slide" class="presentation-slide"></div><div class="presentation-controls"><button id="slide-prev" class="button secondary" data-i18n="previous">Anterior</button><div id="slide-dots" class="slide-dots"></div><button id="slide-next" class="button primary" data-i18n="next">Siguiente</button></div><p class="presentation-hint" data-i18n="presentationHint">Usa ← → para navegar · Esc para salir</p></dialog>
  <div id="toast" class="toast" role="status" aria-live="polite" hidden></div>
  <div id="startup-error" class="startup-error" hidden><h1>No se pudo abrir la aplicación</h1><p>Si abriste index.html directamente, usa <a href="Abrir_sin_instalar.html">Abrir_sin_instalar.html</a> o inicia el servidor local indicado en LEEME.md.</p><button onclick="location.reload()">Reintentar</button></div>
  <noscript><p class="notice">Activa JavaScript para usar los módulos interactivos. / Enable JavaScript to use the interactive modules.</p></noscript>
  <script>if (location.protocol === 'file:') { location.replace('Abrir_sin_instalar.html' + location.hash); }</script>
  <script type="module" src="js/app.js"></script>
</body>
</html>
````

## js/animations.js

````javascript
import { EVENTOS, on } from './events.js';
// Animaciones opcionales sobre el proyecto existente, sin bibliotecas externas.
// Ajusta estas duraciones; los datos y las funciones están en sus propios módulos.
import { isReducedMotion } from './preferences.js';
const motion = {
  entrance: 850,
  reveal: 520,
  chart: 750,
  stagger: 55,
  ease: 'cubic-bezier(.22,1,.36,1)'
};

export function initAnimations() {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  if (!Element.prototype.animate || !window.IntersectionObserver) return;

  const prepared = new WeakSet();
  const running = new Map();
  let frame = 0;
  let intro = true;

  // El contenido permanece visible si la animación no se ejecuta o se interrumpe.
  function play(element, frames, duration = motion.reveal, delay = 0) {
    if (isReducedMotion() || element.contains(document.activeElement)) return;
    running.get(element)?.cancel();
    const animation = element.animate(frames, {
      duration, delay, easing: motion.ease, fill: 'backwards'
    });
    element.style.willChange=element.matches('.chart-line')?'stroke-dashoffset':'transform,opacity';
    running.set(element, animation);
    element.dataset.motionState = 'playing';
    const finish = () => {
      if (running.get(element) === animation) {
        element.style.willChange='';
        running.delete(element);
        element.dataset.motionState = 'done';
      }
    };
    animation.addEventListener('finish', finish, {once: true});
    animation.addEventListener('cancel', finish, {once: true});
  }

  function reveal(element) {
    const delay = Number(element.dataset.motionDelay || 0);
    if (element.matches('.chart-line')) {
      const length = element.getTotalLength();
      if (length > 0) play(element, [
        {strokeDasharray: `${length} ${length}`, strokeDashoffset: length},
        {strokeDasharray: `${length} ${length}`, strokeDashoffset: 0}
      ], motion.chart);
      return;
    }
    const studio = element.matches('.kidney-studio');
    const title=element.matches('h1');
    play(element, [
      {opacity: title?1:0, transform: studio ? 'translateY(12px) scale(.975)' : 'translateY(18px)'},
      {opacity: 1, transform: studio ? 'translateY(0) scale(1)' : 'translateY(0)'}
    ], intro && element.closest('.discovery-grid') ? motion.entrance : motion.reveal, delay);

    // Inspirado en las siluetas secuenciales del HTML recibido: las cifras no cambian.
    element.querySelectorAll('.pictogram svg').forEach((person, index) => play(person, [
      {opacity: 0, transform: 'translateY(7px) scale(.94)'},
      {opacity: 1, transform: 'translateY(0) scale(1)'}
    ], 360, delay + index * motion.stagger));
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      reveal(entry.target);
    });
  }, {threshold: .06, rootMargin: '0px 0px -20px 0px'});

  function visibleScope(element) {
    const dialog = element.closest('dialog');
    return !element.closest('[hidden]') && (!dialog || dialog.open);
  }

  function prepare(element, delay = 0) {
    if (prepared.has(element) || !visibleScope(element)) return;
    prepared.add(element);
    element.dataset.motionItem = '';
    element.dataset.motionDelay = delay;
    observer.observe(element);
  }

  function refresh() {
    frame = 0;
    document.querySelectorAll('.discovery-copy > .eyebrow, .discovery-copy > h1, .hero-description, .hero-actions, .hero-message, .hero-footnote')
      .forEach((element, index) => prepare(element, Math.min(index * 70, 280)));
    document.querySelectorAll('.kidney-studio').forEach(element => prepare(element, 80));
    document.querySelectorAll('.page-intro, .section-heading, .education-regular, .chapter-note, .daily-note, .mini-tracking, .chart-surface, .tracking-aside, .food-notice, .habit-score, .week-surface, .early-detection, .self-check, .universities')
      .forEach(element => prepare(element));
    document.querySelectorAll('.recipe-card, .stat-cell, .credit-block, .symptom-category, .source-item')
      .forEach((element, index) => prepare(element, Math.min(index % 8 * motion.stagger, 220)));
    document.querySelectorAll('.chart-line').forEach(element => prepare(element));
    document.querySelectorAll('dialog[open] .dialog-heading, dialog[open] .recipe-detail-grid, #presentation-dialog[open] .slide-content, #presentation-dialog[open] .slide-visual')
      .forEach((element, index) => prepare(element, index % 2 * 90));
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(refresh);
  }

  // Mantiene las animaciones al cambiar filtros, idioma, capítulos o diapositivas.
  const changes = new MutationObserver(schedule);
  changes.observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ['open']});
  on(EVENTOS.ROUTE, () => {intro = false; schedule();});
  on(EVENTOS.LANGUAGE, schedule);

  // El uso con teclado siempre tiene prioridad sobre una aparición visual.
  document.addEventListener('focusin', event => {
    running.forEach((animation, element) => {
      if (element === event.target || element.contains(event.target)) animation.cancel();
    });
  });

  function preference() {
    root.classList.toggle('motion-ready', !isReducedMotion());
    root.dataset.motion = isReducedMotion() ? 'reduced' : 'enabled';
    if (isReducedMotion()) running.forEach(animation => animation.cancel());
    else schedule();
  }
  reducedMotion.addEventListener('change', preference);
  on(EVENTOS.STATE,preference);
  preference();
  refresh();
  if (!isReducedMotion()) play(document.querySelector('.header-inner'), [
    {opacity: 0, transform: 'translateY(-8px)'},
    {opacity: 1, transform: 'translateY(0)'}
  ], 480);
}
````

## js/app.js

````javascript
// Arranque y precarga de rutas. El navegador ejecuta JavaScript nativo.
import { EVENTOS, on, emit } from './events.js';
import { loadData } from './data.js';
import { initI18n, t } from './i18n.js';
import { initDialogs, toast } from './ui.js';
import { canStore, getRecovery } from './store.js';
import { initRouter, currentRoute } from './router.js';
import { initPreferences } from './preferences.js';
import { initWorkspace } from './workspace.js';
import { initSearch } from './search.js';
import { initAnimations } from './animations.js';
import { initInstall } from './install.js';
const initialized=new Map(),imports=new Map();
const routes={
 descubrir:()=>import('./education.js'),seguimiento:()=>import('./measurements.js'),alimentacion:()=>import('./recipes.js'),habitos:()=>import('./habits.js'),senales:()=>import('./symptoms.js'),proyecto:()=>import('./education.js')
};
function preload(route){if(!imports.has(route))imports.set(route,Promise.all([route==='alimentacion'?loadData(['recipes']):Promise.resolve(),routes[route]()]).then(([,module])=>module).catch(error=>{imports.delete(route);throw error;}));return imports.get(route);}
async function activate(route){if(initialized.has(route))return initialized.get(route);const task=(async()=>{if(route==='alimentacion')await loadData(['recipes']);const module=await preload(route);if(route==='descubrir'){module.initEducation();const kidney=await import('./kidney-explorer.js');kidney.initKidneyExplorer();const tracking=await import('./home-tracking.js');tracking.renderHomeTracking();}if(route==='seguimiento')module.initMeasurements();if(route==='alimentacion')module.initRecipes();if(route==='habitos')module.initHabits();if(route==='senales')module.initSymptoms();if(route==='proyecto')module.renderCredits();})().catch(error=>{initialized.delete(route);throw error;});initialized.set(route,task);return task;}
async function initApp(){await loadData();initPreferences();initI18n();initWorkspace();initDialogs();initSearch();
 // Prepara descubrir aunque la dirección inicial sea otra: conserva el panel de portada.
 await activate('descubrir');
 on(EVENTOS.ROUTE,event=>{activate(event.detail.route).catch(error=>{console.error('Renal COIL ruta:',error);toast(t('importInvalid'));});});
 on(EVENTOS.LANGUAGE,async()=>{if(initialized.has('proyecto'))(await preload('proyecto')).renderCredits();const tracking=await import('./home-tracking.js');tracking.renderHomeTracking();});
 on(EVENTOS.STATE,async event=>{if(event.detail.keys.some(key=>['records','dataMode','activeProfile'].includes(key)))(await import('./home-tracking.js')).renderHomeTracking();});
 document.querySelectorAll('[data-route]').forEach(link=>{let timer;link.addEventListener('pointerenter',()=>{timer=setTimeout(()=>{preload(link.dataset.route).catch(()=>{});},200);});link.addEventListener('pointerleave',()=>clearTimeout(timer));link.addEventListener('focus',()=>{preload(link.dataset.route).catch(()=>{});});});
 let presentation;
 const present=async()=>{await loadData(['recipes','presentation']);if(!presentation){presentation=await import('./presentation.js');presentation.initPresentation();}presentation.openPresentation(location.hash==='#presentacion-espera');};
 document.getElementById('open-presentation').addEventListener('click',()=>present().catch(error=>{console.error('Renal COIL presentación:',error);toast(t('importInvalid'));}));
 window.addEventListener('hashchange',()=>{if(location.hash==='#presentacion-espera')present();});
 initRouter();await activate(currentRoute().route);initAnimations();initInstall();
 let ticking=false;const updateProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.getElementById('reading-progress').style.transform=`scaleX(${max>0?window.scrollY/max:0})`;ticking=false;};
 window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}},{passive:true});on(EVENTOS.ROUTE,updateProgress);updateProgress();
 if(!canStore()&&!getRecovery())toast(t('storageWarning'));document.documentElement.dataset.ready='true';emit(EVENTOS.READY,{version:3});if(location.hash==='#presentacion-espera')await present();
}
initApp().catch(error=>{console.error('Renal COIL:',error);document.getElementById('startup-error').hidden=false;});
````

## js/charts.js

````javascript
import { clinicalReady } from './clinical.js';
// Gráficas SVG con fechas y valores completos, sin dependencias externas.
import { data } from './data.js';
import { formatDate, formatNumber, t } from './i18n.js';
import { escapeHTML } from './ui.js';
export function metricValues(records, metric) {
  return records.filter(r=>typeof r[metric]==='number' && Number.isFinite(r[metric])).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id)).map(r=>({date:r.date,value:r[metric],id:r.id}));
}
export function makeChart(values, metric, mode = 'demo', options = {}) {
  if(!values.length)return `<div class="empty-state"><p>${escapeHTML(t('noChartData'))}</p></div>`;
  const width = Math.max(310,options.width || 640), height=options.height||250;
  const left=50,right=width-18,top=20,bottom=height-42;
  const config = data.ranges.metrics[metric];
  const reference = (!options.monochrome&&(mode==='demo' || clinicalReady())) ? config.exampleBand : null;
  const raw = values.map(p=>p.value).concat(reference||[]);
  let low=Math.min(...raw),high=Math.max(...raw);
  const spread=high-low || Math.max(Math.abs(high)*.2,1);
  low=Math.max(0,low-spread*.16);high+=spread*.16;
  const dates=values.map(p=>new Date(`${p.date}T12:00:00`).getTime());
  const firstDate=dates[0],lastDate=dates.at(-1);
  const x=(date)=>lastDate===firstDate?(left+right)/2:left+(date-firstDate)/(lastDate-firstDate)*(right-left);
  const y=(value)=>bottom-(value-low)/(high-low)*(bottom-top);
  const points=values.map((p,i)=>({x:x(dates[i]),y:y(p.value),...p}));
  const polyline=points.map(p=>`${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const path=points.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
  const grid=[0,.25,.5,.75,1].map(f=>{const yy=bottom-f*(bottom-top),value=low+f*(high-low);return `<line class="chart-gridline" x1="${left}" x2="${right}" y1="${yy}" y2="${yy}"/><text x="${left-8}" y="${yy+5}" text-anchor="end">${escapeHTML(formatNumber(value,metric==='creatinine'?2:1))}</text>`;}).join('');
  const tickCount=width<480?3:5;
  const indexes=[...new Set(Array.from({length:Math.min(tickCount,values.length)},(_,i)=>Math.round(i*(values.length-1)/Math.max(1,Math.min(tickCount,values.length)-1))))];
  const xLabels=indexes.map(index=>`<text x="${points[index].x}" y="${height-12}" text-anchor="${index===0&&values.length>1?'start':index===values.length-1&&values.length>1?'end':'middle'}">${escapeHTML(formatDate(values[index].date))}</text>`).join('');
  const band=reference?`<rect x="${left}" y="${y(reference[1])}" width="${right-left}" height="${y(reference[0])-y(reference[1])}" fill="#d7e2ce" opacity=".38"/>`:'';
  const summary=values.map(v=>`${formatDate(v.date,{year:'numeric',month:'short',day:'numeric'})}: ${formatNumber(v.value,2)} ${config.unit}`).join('; ');
  return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="group" aria-label="${escapeHTML(t('chartAccessible',{metric:t(metric),summary}))}">${band}${grid}${points.length>1?`<path d="${path} L${points.at(-1).x} ${bottom} L${points[0].x} ${bottom}Z" fill="#315f7d" opacity=".035"/><polyline class="chart-line" points="${polyline}"/>`:''}${points.map(p=>`<circle class="chart-point" cx="${p.x}" cy="${p.y}" r="12" style="fill:transparent" tabindex="0" role="img" aria-label="${escapeHTML(`${formatDate(p.date)}: ${formatNumber(p.value,2)} ${config.unit}`)}" data-chart-label="${escapeHTML(`${formatDate(p.date)} · ${formatNumber(p.value,2)} ${config.unit}`)}"><title>${escapeHTML(`${formatDate(p.date)}: ${formatNumber(p.value,2)} ${config.unit}`)}</title></circle><circle class="chart-value" cx="${p.x}" cy="${p.y}" r="4" fill="var(--blue)" aria-hidden="true" pointer-events="none"/>`).join('')}${xLabels}</svg><div class="chart-tooltip" hidden></div>`;
}
export function attachChartTooltip(container) {
  const show=event=>{const point=event.target.closest('[data-chart-label]');if(!point)return;const tooltip=container.querySelector('.chart-tooltip');tooltip.textContent=point.dataset.chartLabel;tooltip.hidden=false;};
  const hide=()=>{const tooltip=container.querySelector('.chart-tooltip');if(tooltip)tooltip.hidden=true;};
  container.addEventListener('pointerover',show);container.addEventListener('focusin',show);container.addEventListener('pointerleave',hide);container.addEventListener('focusout',hide);
}
````

## js/clinical.js

````javascript
// La mera activación de un booleano no basta: requiere una revisión identificable y fuentes.
import { data } from './data.js';
export function clinicalReady(){const validation=data.ranges?.clinicalValidation;if(!validation?.approved||!validation.reviewer||!/^\d{4}-\d{2}-\d{2}$/.test(validation.reviewDate||''))return false;return Object.values(data.ranges.metrics).every(metric=>!metric.exampleRules||data.sources.some(source=>source.id===metric.sourceId));}
````

## js/csv.js

````javascript
// Formato de intercambio: conserva vacíos, precisión y procedencia de cada fila.
export const measurementKeys = ['glucose','hba1c','systolic','diastolic','creatinine','egfr','uacr','weight'];
export function measurementCSV(records, {language = 'es', mode = 'personal', metrics, labels}) {
  const delimiter = language === 'es' ? ';' : ',';
  const quote = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const number = value => value === null || value === undefined ? '' : language === 'es' ? String(value).replace('.', ',') : String(value);
  const header = [labels.date, ...measurementKeys.map(key => `${labels[key]} (${metrics[key].unit})`), language === 'es' ? 'Notas' : 'Notes',language === 'es' ? 'Etiquetas' : 'Tags',language === 'es' ? 'Origen' : 'Origin'];
  const rows = [header, ...records.map(record => [record.date, ...measurementKeys.map(key => number(record[key])), (/^[=+@-]/.test(record.notes||'')?"'":'')+(record.notes||''),(record.tags||[]).join('|'),mode === 'demo' ? 'fictional-demo' : 'personal-local'])];
  return '\uFEFF' + rows.map(row => row.map(quote).join(delimiter)).join('\r\n');
}

// Analizador CSV con comillas dobles, saltos dentro de celdas y errores explícitos.
export function parseCSV(text,delimiter){const rows=[],row=[];let cell='',quoted=false,closed=false;const source=text.replace(/^\uFEFF/,'');for(let i=0;i<source.length;i++){const c=source[i];if(quoted){if(c==='"'){if(source[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;}else if(c==='"'){if(cell||closed)throw new Error('Comillas fuera de posición');quoted=true;}else if(c===delimiter){row.push(cell);cell='';closed=false;}else if(c==='\r'||c==='\n'){if(c==='\r'&&source[i+1]==='\n')i++;row.push(cell);if(row.some(value=>value!==''))rows.push([...row]);row.length=0;cell='';closed=false;}else{if(closed)throw new Error('Texto después de cerrar comillas');cell+=c;}}if(quoted)throw new Error('Comillas sin cerrar');row.push(cell);if(row.some(value=>value!==''))rows.push(row);return rows;}
export function readMeasurementCSV(text,{metrics,esLabels,enLabels,today}){
  if(typeof text!=='string'||text.length>1e6)throw new Error('CSV demasiado grande');
  const first=text.replace(/^\uFEFF/,'').split(/\r?\n/)[0],delimiter=first.includes(';')?';':',',language=delimiter===';'?'es':'en',labels=language==='es'?esLabels:enLabels;
  const rows=parseCSV(text,delimiter);if(rows.length<1)throw new Error('CSV vacío');
  const base=[labels.date,...measurementKeys.map(key=>`${labels[key]} (${metrics[key].unit})`)];
  const origin=language==='es'?'Origen':'Origin',notes=language==='es'?'Notas':'Notes',tags=language==='es'?'Etiquetas':'Tags';
  const header=rows.shift(),extended=header.length===12,expected=[...base,...(extended?[notes,tags]:[]),origin];
  if(header.length!==expected.length||header.some((cell,i)=>cell!==expected[i]))throw new Error('Cabeceras o unidades no reconocidas');
  const accepted=[],rejected=[];
  rows.forEach((row,index)=>{try{
    if(row.length!==header.length)throw new Error('Número de columnas incorrecto');
    if(row.at(-1)!=='personal-local')throw new Error(row.at(-1)==='fictional-demo'?'Ejemplo ficticio excluido':'Procedencia no reconocida');
    const date=row[0],parsed=new Date(`${date}T12:00:00`);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(parsed.valueOf())||`${parsed.getFullYear()}-${String(parsed.getMonth()+1).padStart(2,'0')}-${String(parsed.getDate()).padStart(2,'0')}`!==date||date>today)throw new Error('Fecha inválida o futura');
    const record={id:`csv-${Date.now()}-${index}`,date,notes:extended?row[9]:'',tags:extended&&row[10]?row[10].split('|'):[]};
    if(record.notes.startsWith("'")&&/^[=+@-]/.test(record.notes.slice(1)))record.notes=record.notes.slice(1);
    if(record.notes.length>280||record.tags.some(tag=>!['fasting','post-dinner','visit'].includes(tag)))throw new Error('Notas o etiquetas inválidas');
    measurementKeys.forEach((key,i)=>{const raw=row[i+1],normalized=language==='es'?raw.replace(',','.'):raw;if(raw&&!/^\d+(\.\d+)?$/.test(normalized))throw new Error(`Número inválido: ${key}`);record[key]=raw?Number(normalized):null;if(record[key]!==null&&(!Number.isFinite(record[key])||record[key]<metrics[key].technicalMin||record[key]>metrics[key].technicalMax))throw new Error(`Valor fuera de límites de captura: ${key}`);});
    if(measurementKeys.every(key=>record[key]===null))throw new Error('Fila sin mediciones');
    if((record.systolic===null)!==(record.diastolic===null)||(record.systolic!==null&&record.systolic<=record.diastolic))throw new Error('Par de presión inválido');
    accepted.push(record);
  }catch(error){rejected.push({line:index+2,reason:error.message});}});
  return {language,accepted,rejected};
}
export function duplicateCount(existing,incoming){return incoming.reduce((count,row)=>count+measurementKeys.filter(key=>row[key]!==null&&existing.some(r=>r.date===row.date&&r[key]!==null)).length,0);}
export function mergeImportedRecords(existing,incoming,strategy='keep'){let result=structuredClone(existing);for(const row of incoming){if(strategy==='overwrite'){result=result.map(r=>r.date===row.date?{...r,...Object.fromEntries(measurementKeys.filter(key=>row[key]!==null).map(key=>[key,null]))}:r).filter(r=>measurementKeys.some(key=>r[key]!==null));}result.push(structuredClone({...row,id:globalThis.crypto?.randomUUID?.()||`${row.id}-${Math.random().toString(36).slice(2)}`}));}return result;}
````

## js/data.js

````javascript
// Carga compartida y bajo demanda. El archivo autónomo contiene los mismos datos.
export const data={};
const pending=new Map();
const files={es:'data/contenido.es.json',en:'data/contenido.en.json',recipes:'data/recetas.json',ranges:'data/rangos.json',sources:'data/fuentes.json',kidney:'assets/kidney.svg',presentation:'data/presentacion.json'};
export async function loadData(keys=['es','en','ranges','sources','kidney']){
 if(window.__COIL_DATA){Object.assign(data,window.__COIL_DATA);return;}
 await Promise.all(keys.map(key=>{if(data[key])return Promise.resolve();if(pending.has(key))return pending.get(key);const task=(async()=>{const response=await fetch(files[key]);if(!response.ok)throw new Error(`No se pudo cargar ${files[key]}`);data[key]=key==='kidney'?await response.text():await response.json();})().catch(error=>{pending.delete(key);throw error;});pending.set(key,task);return task;}));
}
````

## js/education.js

````javascript
import { EVENTOS, on } from './events.js';
// Cuatro capítulos educativos; el contenido editable está en data/.
import { data } from './data.js';
import { content, language, t } from './i18n.js';
import { escapeHTML } from './ui.js';
import { currentRoute } from './router.js';
export function sourceLinks(ids) {
  return ids.map(id=>data.sources.find(source=>source.id===id)).filter(Boolean).map(source=>`<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title[language()])}</a>`).join('');
}
export function pictogram(total, highlighted) {
  return `<div class="pictogram" aria-hidden="true">${Array.from({length:total},(_,i)=>`<svg class="${i<highlighted?'highlight':''}" viewBox="0 0 24 42"><circle cx="12" cy="5" r="4" fill="currentColor"/><path d="M6 12h12v14h-3v14H9V26H6Z" fill="currentColor"/></svg>`).join('')}</div>`;
}
function pendingStats() {
  const provenance=stat=>`<div class="stat-provenance"><p>${escapeHTML(t('sourceLabel'))}: ${stat.url?`<a href="${escapeHTML(stat.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(stat.source||t('pendingSource'))}</a>`:escapeHTML(stat.source||t('pendingSource'))}</p><p>${escapeHTML(t('year'))}: ${escapeHTML(stat.year??t('pendingYear'))}</p><p>${escapeHTML(t('population'))}: ${escapeHTML(stat.population||t('pendingPopulation'))}</p><p>${escapeHTML(t('methodology'))}: ${escapeHTML(stat.methodology||t('pendingMethodology'))}</p></div>`;
  return `<div class="stat-grid"><div class="stat-cell"><p class="small-label">${escapeHTML(t('draftStat'))}</p><div class="stat-number">${escapeHTML(content().statistics[0].display)}</div>${pictogram(10,3)}<p>${escapeHTML(t('draftEstimate'))}</p>${provenance(content().statistics[0])}</div><div class="stat-cell"><p class="small-label">${escapeHTML(t('mexico'))} / ${escapeHTML(t('validationPending'))}</p><div class="stat-number">${escapeHTML(content().statistics[1].display)}</div>${pictogram(4,1)}<p>${escapeHTML(t('draftEstimate'))}</p>${provenance(content().statistics[1])}</div></div><div class="us-comparison"><strong>${escapeHTML(t('usNumber'))}</strong><div><p><b>${escapeHTML(t('usComparison'))}</b></p><p>${escapeHTML(t('usPopulation'))}</p><div class="chapter-sources">${sourceLinks(['niddk-dkd'])}</div>${provenance(content().statistics[2])}</div></div><p class="fine-print" style="margin-top:1rem">${escapeHTML(t('globalNote'))}</p>`;
}
export function renderEducation() {
  const route = currentRoute();
  const sections = content().sections;
  const selected = sections.find(section=>section.id===route.chapter) || sections[0];
  const tabs = document.getElementById('education-tabs');
  const focusedId = document.activeElement?.id;
  tabs.innerHTML = sections.map((section,i)=>`<button id="chapter-${section.id}" role="tab" aria-selected="${section.id===selected.id}" aria-controls="education-panel" tabindex="${section.id===selected.id?0:-1}" data-chapter="${section.id}"><span>${String(i+1).padStart(2,'0')}</span><span>${escapeHTML(section.tab)}</span></button>`).join('');
  const panel = document.getElementById('education-panel');
  panel.setAttribute('aria-labelledby',`chapter-${selected.id}`);
  panel.innerHTML = `<div class="education-regular"><div><p class="eyebrow">${escapeHTML(selected.eyebrow)}</p><h2>${escapeHTML(selected.title)}</h2><p class="chapter-description">${escapeHTML(selected.description)}</p></div><div class="chapter-points"><h3>${escapeHTML(selected.pointsTitle)}</h3><ol>${selected.points.map(point=>`<li>${escapeHTML(point)}</li>`).join('')}</ol></div></div>${selected.id==='epidemiologia'?pendingStats():''}<p class="chapter-note">${escapeHTML(selected.note)}</p><div class="chapter-sources">${sourceLinks(selected.sources)}</div>`;
  if (focusedId?.startsWith('chapter-')) document.getElementById(focusedId)?.focus({preventScroll:true});
}
export function initEducation() {
  const tabs = document.getElementById('education-tabs');
  tabs.addEventListener('click',event=>{const button=event.target.closest('[data-chapter]');if(button)location.hash=`descubrir/${button.dataset.chapter}`;});
  tabs.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    const buttons=[...tabs.querySelectorAll('button')];const current=buttons.indexOf(document.activeElement);if(current<0)return;
    event.preventDefault();const index=event.key==='Home'?0:event.key==='End'?buttons.length-1:(current+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
    location.hash=`descubrir/${buttons[index].dataset.chapter}`;
    buttons[index].focus({preventScroll:true});
  });
  on(EVENTOS.ROUTE,event=>{if(event.detail.route==='descubrir')renderEducation();});
  on(EVENTOS.LANGUAGE,renderEducation);
  renderEducation();
}
export function renderCredits() {
  document.getElementById('credits-content').innerHTML = `<div class="credits-grid">${content().creditsBlocks.map(block=>`<div class="credit-block"><span>${block.number}</span><h2>${escapeHTML(block.title)}</h2><p>${escapeHTML(block.text)}</p></div>`).join('')}</div><div class="universities"><p class="eyebrow">${escapeHTML(t('slideCreditLabel'))}</p><div class="university-list">${content().universities.map(name=>`<span>${escapeHTML(name)}</span>`).join('')}</div><p class="fine-print">${escapeHTML(content().creditReview)}</p></div>`;
  document.getElementById('source-list').innerHTML = `<p class="source-pending">${escapeHTML(t('sourcePendingDisclaimer'))}</p>${data.sources.map(source=>`<div class="source-item"><div><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title[language()])}</a><small>${escapeHTML(t('sourceChecked'))}</small></div><div><p>${escapeHTML(source.scope[language()])}</p><small>${source.reviewDate?escapeHTML(source.reviewDate):escapeHTML(t('sourceNoDate'))}</small></div></div>`).join('')}`;
}
````

## js/events.js

````javascript
// Bus compartido. Los handlers reciben un CustomEvent con su propiedad detail.
/** @typedef {{route:string, chapter?:string}} RouteDetail */
/** @typedef {{keys:string[], profileId?:string}} StateDetail */
export const EVENTOS = Object.freeze({
  ROUTE: 'coil:route', LANGUAGE: 'coil:language', STATE: 'coil:state', READY: 'coil:ready'
});
/** @param {string} event @param {RouteDetail|StateDetail|object} [detail] */
export function emit(event, detail = {}) {
  if (!Object.values(EVENTOS).includes(event)) throw new TypeError('Unknown COIL event');
  if (typeof document !== 'undefined') document.dispatchEvent(new CustomEvent(event, {detail}));
}
/** @param {string} event @param {(event:CustomEvent)=>void} handler */
export function on(event, handler) {
  document.addEventListener(event, handler);
  return () => document.removeEventListener(event, handler);
}
````

## js/files.js

````javascript
// Exportación local; no transmite contenido a ningún servidor.
import { localDate } from './store.js';
export function downloadText(text,name,type='text/plain;charset=utf-8'){const url=URL.createObjectURL(new Blob([text],{type})),link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
export function datedName(prefix,extension){return `${prefix}-${localDate()}.${extension}`;}
````

## js/habit-tools.js

````javascript
import { EVENTOS, on } from './events.js';
import { content, t, language, formatDate } from './i18n.js';
import { getState, updateState, localDate, parseDate, shiftDate } from './store.js';
import { getHabitScore } from './selectors.js';
import { escapeHTML as e, icon, toast } from './ui.js';
import { downloadText, datedName } from './files.js';
let monthOffset=0,selectedDate=localDate(),monthly=false;
export function initHabitTools(){document.querySelector('.week-surface').insertAdjacentHTML('afterbegin',`<div class="calendar-view-toolbar"><div class="segmented" role="group" aria-label="${e(t('habitsTitle'))}"><button id="habit-weekly" aria-pressed="true" data-i18n="weeklyView">${e(t('weeklyView'))}</button><button id="habit-monthly" aria-pressed="false" data-i18n="monthlyView">${e(t('monthlyView'))}</button></div><button id="habits-export" class="text-link" data-i18n="exportHabits">${e(t('exportHabits'))}</button></div><div id="month-panel" hidden><div class="week-toolbar"><button id="month-prev" class="icon-button" data-i18n-aria="monthPrevious" aria-label="${e(t('monthPrevious'))}">‹</button><h2 id="month-title"></h2><button id="month-next" class="icon-button" data-i18n-aria="monthNext" aria-label="${e(t('monthNext'))}">›</button></div><p class="fine-print" data-i18n="monthlyHint">${e(t('monthlyHint'))}</p><div id="month-grid" class="month-grid"></div><div id="month-day-detail" class="month-day-detail"></div></div>`);
 document.querySelector('.habits-layout').insertAdjacentHTML('afterend',`<div class="habit-detail-tools"><section class="streak-surface" aria-labelledby="habit-streak-title"><h2 id="habit-streak-title" data-i18n="perHabitStreakTitle">${e(t('perHabitStreakTitle'))}</h2><div id="habit-streaks" class="habit-streaks"></div></section><form id="habit-note-form" class="note-surface"><h2 data-i18n="dailyNote">${e(t('dailyNote'))}</h2><label class="form-field"><span data-i18n="date">${e(t('date'))}</span><input id="habit-note-date" type="date" required max="${localDate()}" value="${localDate()}"></label><label class="form-field"><span data-i18n="notes">${e(t('notes'))}</span><textarea id="habit-note" rows="3" maxlength="280" aria-describedby="habit-note-hint"></textarea><span id="habit-note-hint" class="field-hint" data-i18n="recordNotesHint">${e(t('recordNotesHint'))}</span></label><button class="button secondary" data-i18n="saveNote">${e(t('saveNote'))}</button></form></div>`);
 const view=value=>{monthly=value;document.getElementById('month-panel').hidden=!monthly;document.querySelector('.week-surface > .week-toolbar').hidden=monthly;document.getElementById('habit-grid').hidden=monthly;document.querySelector('.week-bottom').hidden=monthly;document.getElementById('habit-weekly').setAttribute('aria-pressed',String(!monthly));document.getElementById('habit-monthly').setAttribute('aria-pressed',String(monthly));renderHabitTools();};
 document.getElementById('habit-weekly').addEventListener('click',()=>view(false));document.getElementById('habit-monthly').addEventListener('click',()=>view(true));
 document.getElementById('month-prev').addEventListener('click',()=>{monthOffset--;renderMonth();});document.getElementById('month-next').addEventListener('click',()=>{if(monthOffset<0){monthOffset++;renderMonth();}});
 document.getElementById('month-grid').addEventListener('click',event=>{const button=event.target.closest('[data-month-day]');if(!button||button.disabled)return;selectedDate=button.dataset.monthDay;document.getElementById('habit-note-date').value=selectedDate;loadNote();renderMonth();document.querySelector(`[data-month-day="${selectedDate}"]`)?.focus({preventScroll:true});});
 document.getElementById('month-day-detail').addEventListener('click',event=>{const button=event.target.closest('[data-month-habit]');if(!button)return;const habits=getState().habits;habits[selectedDate]={...habits[selectedDate],[button.dataset.monthHabit]:habits[selectedDate]?.[button.dataset.monthHabit]!==true};if(!updateState({habits}))toast(t('saveFailed'));});
 document.getElementById('habit-note-date').addEventListener('change',loadNote);document.getElementById('habit-note-form').addEventListener('submit',event=>{event.preventDefault();if(!event.currentTarget.reportValidity())return;const date=document.getElementById('habit-note-date').value,note=document.getElementById('habit-note').value;if(date>localDate())return;if(updateState({habitNotes:{...getState().habitNotes,[date]:note}}))toast(t('noteSaved'));else toast(t('saveFailed'));});
 document.getElementById('habits-export').addEventListener('click',()=>{const state=getState(),delimiter=language()==='es'?';':',',q=value=>'"'+String(value??'').replace(/"/g,'""')+'"',dates=[...new Set([...Object.keys(state.habits),...Object.keys(state.habitNotes)])].sort();const rows=[[t('date'),...content().habits.map(h=>h.title),t('notes'),'Origin'],...dates.map(date=>[date,...content().habits.map(h=>state.habits[date]?.[h.id]===true?'1':'0'),(/^[=+@-]/.test(state.habitNotes[date]||'')?"'":'')+(state.habitNotes[date]||''),'personal-local'])];downloadText('\uFEFF'+rows.map(row=>row.map(q).join(delimiter)).join('\r\n'),datedName('renal-habitos','csv'),'text/csv;charset=utf-8');});
 on(EVENTOS.STATE,event=>{if(event.detail.keys.some(k=>['habits','habitNotes','activeProfile'].includes(k))){renderHabitTools();if(document.activeElement?.id!=='habit-note')loadNote();}});on(EVENTOS.LANGUAGE,renderHabitTools);loadNote();renderHabitTools();
}
function loadNote(){document.getElementById('habit-note').value=getState().habitNotes[document.getElementById('habit-note-date').value]||'';}
export function renderHabitTools(){if(!document.getElementById('habit-streaks'))return;const score=getHabitScore(getState(),content().habits,[],localDate());document.getElementById('habit-streaks').innerHTML=content().habits.map(h=>`<div><span>${e(h.title)}</span><strong>${e(t('habitStreak',{count:score.perHabit[h.id]}))}</strong></div>`).join('');if(monthly)renderMonth();}
function renderMonth(){const focusedHabit=document.activeElement?.dataset.monthHabit,focusedDate=document.activeElement?.dataset.monthDay;const date=parseDate(localDate());date.setDate(1);date.setMonth(date.getMonth()+monthOffset);const first=localDate(date),start=shiftDate(first,-((date.getDay()+6)%7)),endDate=new Date(date.getFullYear(),date.getMonth()+1,0),last=localDate(endDate),today=localDate(),state=getState();document.getElementById('month-title').textContent=new Intl.DateTimeFormat(language()==='es'?'es-CO':'en-US',{month:'long',year:'numeric'}).format(date);document.getElementById('month-next').disabled=monthOffset===0;const count=Math.ceil((endDate.getDate()+((date.getDay()+6)%7))/7)*7;document.getElementById('month-grid').innerHTML=Array.from({length:7},(_,i)=>`<span class="month-weekday">${e(new Intl.DateTimeFormat(language()==='es'?'es-CO':'en-US',{weekday:'short'}).format(parseDate(shiftDate(start,i))))}</span>`).join('')+Array.from({length:count},(_,i)=>{const day=shiftDate(start,i),done=Object.values(state.habits[day]||{}).filter(Boolean).length;return `<button data-month-day="${day}" class="month-day ${day===today?'today':''}" aria-pressed="${day===selectedDate}" aria-label="${e(formatDate(day,{weekday:'long',day:'numeric',month:'long'})+' · '+done+' / '+content().habits.length)}" ${day>today?'disabled':''} ${day<first||day>last?'style="opacity:.4"':''}><strong>${parseDate(day).getDate()}</strong><span>${done?'●'.repeat(done):'·'}</span>${state.habitNotes[day]?'<small aria-hidden="true">✎</small>':''}</button>`;}).join('');document.getElementById('month-day-detail').innerHTML=`<h3>${e(formatDate(selectedDate,{weekday:'long',day:'numeric',month:'long'}))}</h3><div class="month-habit-list">${content().habits.map(h=>`<button data-month-habit="${h.id}" aria-pressed="${state.habits[selectedDate]?.[h.id]===true}">${state.habits[selectedDate]?.[h.id]?icon('check',16):'○'} ${e(h.title)}</button>`).join('')}</div>`;if(focusedHabit)document.querySelector(`[data-month-habit="${focusedHabit}"]`)?.focus({preventScroll:true});if(focusedDate)document.querySelector(`[data-month-day="${focusedDate}"]`)?.focus({preventScroll:true});}
````

## js/habits.js

````javascript
import { EVENTOS, on } from './events.js';
// Calendario semanal, progreso y racha con fechas locales.
import { content, t, language, formatDate } from './i18n.js';
import { getState, updateState, localDate, parseDate, shiftDate } from './store.js';
import { escapeHTML, icon, confirmAction, toast } from './ui.js';
import { getHabitScore } from './selectors.js';
import { initHabitTools, renderHabitTools } from './habit-tools.js';
let weekOffset = 0;
function weekDates() {
  const today=localDate(),date=parseDate(today),monday=shiftDate(today,-((date.getDay()+6)%7)+weekOffset*7);
  return Array.from({length:7},(_,i)=>shiftDate(monday,i));
}
export function renderHabits() {
  const dates=weekDates(),today=localDate(),habits=content().habits,state=getState().habits;
  document.getElementById('week-title').textContent=t('weekRange',{start:formatDate(dates[0]),end:formatDate(dates[6],{day:'numeric',month:'short',year:'numeric'})});
  document.getElementById('week-next').disabled=weekOffset===0;
  const focused=document.activeElement?.dataset.habit;
  const grid=document.getElementById('habit-grid');
  grid.innerHTML=`<div class="habit-day-heading" style="text-align:left;align-items:flex-start">${escapeHTML(t('habitColumn'))}</div>${dates.map(date=>`<div class="habit-day-heading ${date===today?'today':''}"><span>${escapeHTML(new Intl.DateTimeFormat(language()==='es'?'es-CO':'en-US',{weekday:'short'}).format(parseDate(date)).replace('.',''))}</span><strong>${parseDate(date).getDate()}</strong></div>`).join('')}${habits.map(habit=>`<div class="habit-label"><span>${escapeHTML(habit.title)}</span><small>${escapeHTML(habit.detail)}</small></div>${dates.map(date=>{const checked=state[date]?.[habit.id]===true;return `<div class="habit-cell"><button class="habit-check" data-habit="${habit.id}:${date}" aria-pressed="${checked}" aria-label="${escapeHTML(t('habitDay',{habit:habit.title,date:formatDate(date,{weekday:'long',day:'numeric',month:'long'})}))}" ${date>today?'disabled':''}>${checked?icon('check',17):'<span aria-hidden="true">·</span>'}</button></div>`;}).join('')}`).join('')}`;
  if(focused)grid.querySelector(`[data-habit="${focused}"]`)?.focus({preventScroll:true});
  const {total,done,percent,streak}=getHabitScore(getState(),habits,dates,today);
  document.getElementById('habit-percent').innerHTML=`${percent}<small>%</small>`;
  document.getElementById('habit-progress-circle').style.strokeDashoffset=String(540.36*(1-percent/100));
  document.getElementById('habit-feedback').textContent=t(percent===0?'feedbackStart':percent<50?'feedbackSome':percent<100?'feedbackGood':'feedbackComplete');
  document.getElementById('habit-progress-text').textContent=t('weekCompleted',{done,total});
  document.getElementById('habit-streak').textContent=String(streak);renderHabitTools();
}
export function initHabits() {
  initHabitTools();
  document.getElementById('habit-grid').addEventListener('click',event=>{
    const button=event.target.closest('[data-habit]');if(!button||button.disabled)return;
    const [habit,date]=button.dataset.habit.split(':');
    if(date>localDate())return;
    const marks=getState().habits;marks[date]={...marks[date],[habit]:marks[date]?.[habit]!==true};
    if(updateState({habits:marks})){renderHabits();toast(t('habitUpdated'));}else toast(t('saveFailed'));
  });
  document.getElementById('week-prev').addEventListener('click',()=>{weekOffset--;renderHabits();});
  document.getElementById('week-next').addEventListener('click',()=>{if(weekOffset<0){weekOffset++;renderHabits();}});
  document.getElementById('clear-week').addEventListener('click',async()=>{if(await confirmAction(t('weekClearTitle'),t('weekClearDescription'))){const marks=getState().habits;weekDates().forEach(date=>delete marks[date]);if(updateState({habits:marks})){renderHabits();toast(t('resetComplete'));}else toast(t('saveFailed'));}});
  on(EVENTOS.STATE,event=>{if(event.detail.keys.some(k=>['habits','activeProfile'].includes(k)))renderHabits();});
  on(EVENTOS.LANGUAGE,renderHabits);
  renderHabits();
}
````

## js/home-tracking.js

````javascript
import { t, formatNumber, formatDate } from './i18n.js';
import { getState, demoRecords } from './store.js';
import { escapeHTML } from './ui.js';
export function renderHomeTracking() {
  const target=document.getElementById('home-tracking'),state=getState();
  const records=state.dataMode==='demo'?demoRecords():state.records;
  const glucose=records.filter(r=>typeof r.glucose==='number').sort((a,b)=>a.date.localeCompare(b.date)).map(r=>({date:r.date,value:r.glucose})).at(-1),pressure=records.filter(r=>typeof r.systolic==='number').sort((a,b)=>a.date.localeCompare(b.date)).map(r=>({date:r.date,value:r.systolic})).at(-1);
  if(!records.length){target.innerHTML=`<div class="home-empty"><p>${escapeHTML(t('noRecords'))}</p><p>${escapeHTML(t('noRecordsHint'))}</p></div>`;return;}
  target.innerHTML=`<span class="tag ${state.dataMode==='demo'?'demo-tag':''}">${escapeHTML(t(state.dataMode==='demo'?'demoMode':'realMode'))}</span><div class="mini-result-grid"><div><span>${escapeHTML(t('glucose'))}</span><strong>${glucose?formatNumber(glucose.value):'—'}</strong><small>mg/dL ${glucose?'· '+escapeHTML(formatDate(glucose.date)):''}</small></div><div><span>${escapeHTML(t('systolic'))}</span><strong>${pressure?formatNumber(pressure.value):'—'}</strong><small>mmHg ${pressure?'· '+escapeHTML(formatDate(pressure.date)):''}</small></div></div><p class="fine-print" style="margin-top:1rem">${escapeHTML(t(state.dataMode==='demo'?'demoDescription':'personalTableNote'))}</p>`;
}
````

## js/i18n.js

````javascript
import { EVENTOS, emit } from './events.js';
// Traducciones, formatos de fecha y número, y cambio de idioma.
import { data } from './data.js';
import { getState, updateState } from './store.js';
let currentLanguage = getState().language;
export function language() { return currentLanguage; }
export function content() { return data[currentLanguage]; }
export function t(key, values = {}) {
  const pluralKey=values.count===1&&content()?.[key+'One']?key+'One':key;
  const result = content()?.[pluralKey] ?? data.es?.[pluralKey] ?? key;
  if (typeof result !== 'string') return key;
  return result.replace(/\{(\w+)\}/g,(_,name)=>String(values[name] ?? `{${name}}`));
}
export function translateDOM(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ el.placeholder = t(el.dataset.i18nPlaceholder); });
}
export function setLanguage(value) {
  if (!data[value] || value === currentLanguage) return;
  currentLanguage = value;
  updateState({language:value});
  applyLanguage();
  emit(EVENTOS.LANGUAGE, {language: value});
}
function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.title = t('pageTitle');
  document.querySelector('meta[name="description"]')?.setAttribute('content',t('pageDescription'));
  document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===currentLanguage)));
  translateDOM();
}
export function initI18n() {
  applyLanguage();
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
}
export function formatNumber(value, digits = 1) { return new Intl.NumberFormat(currentLanguage === 'es' ? 'es-CO' : 'en-US',{maximumFractionDigits:digits}).format(value); }
export function formatDate(value, options = {day:'numeric',month:'short'}) { return new Intl.DateTimeFormat(currentLanguage === 'es' ? 'es-CO' : 'en-US',options).format(new Date(`${value}T12:00:00`)); }
````

## js/install.js

````javascript
// Instalación opcional. El SW no almacena datos personales ni el archivo autónomo.
export function initInstall(){let prompt=null;const button=document.getElementById('install-app');window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;button.hidden=false;});button.addEventListener('click',async()=>{if(!prompt)return;await prompt.prompt();await prompt.userChoice;prompt=null;button.hidden=true;});window.addEventListener('appinstalled',()=>{prompt=null;button.hidden=true;});if('serviceWorker' in navigator&&!window.__COIL_DATA&&['https:','http:'].includes(location.protocol)){const register=()=>navigator.serviceWorker.register('./sw.js').catch(()=>{});if(document.readyState==='complete')setTimeout(register,3000);else window.addEventListener('load',()=>setTimeout(register,3000),{once:true});}}
````

## js/kidney-explorer.js

````javascript
import { EVENTOS, on } from './events.js';
// Puntos interactivos del esquema y comparación conceptual del filtrado.
import { data } from './data.js';
import { content, t, translateDOM } from './i18n.js';
import { escapeHTML } from './ui.js';
import { initKidneyTools } from './kidney-tools.js';
import { isReducedMotion } from './preferences.js';
let activePart = 'corteza';
export function filterSVG(stage = 0) {
  const barrierColor = stage<2?'#738b70':'#b66f59';
  const smallDots = [[70,78],[108,104],[81,148],[118,183],[71,219],[119,246]];
  const flowCount = [6,6,5,3][stage];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 320" role="img" aria-label="${escapeHTML(t('filterDiagramLabel'))}"><rect x="24" y="44" width="167" height="220" rx="15" fill="#e3ecef"/><rect x="222" y="44" width="190" height="220" rx="15" fill="#f2e9d5"/><text x="25" y="27" class="filter-label">${escapeHTML(t('filterBlood'))}</text><text x="229" y="27" class="filter-label">${escapeHTML(t('filterUrine'))}</text><path d="M207 49v38m0 20v40m0 20v41m0 20v31" stroke="${barrierColor}" stroke-width="9" stroke-linecap="round"/>${smallDots.map(([x,y],i)=>`<circle class="filter-dot" cx="${x}" cy="${y}" r="4.5"/><circle class="filter-dot" cx="${i<flowCount?285+(i%3)*25:157}" cy="${y}" r="4.5" opacity="${i<flowCount?1:.3}"/>`).join('')}<circle class="protein-dot" cx="129" cy="80" r="10"/><circle class="protein-dot" cx="99" cy="166" r="10"/><circle class="protein-dot" cx="135" cy="219" r="10"/>${stage>=2?`<circle class="protein-dot" cx="331" cy="112" r="10" opacity=".8"/>${stage===3?'<circle class="protein-dot" cx="355" cy="224" r="10" opacity=".8"/>':''}`:''}<circle r="4.5" fill="#315f7d"><animateMotion dur="${3+stage}s" repeatCount="indefinite" path="M70 148H${stage===3?189:357}"/></circle><circle r="4.5" fill="#315f7d"><animateMotion dur="${4+stage}s" repeatCount="indefinite" path="M98 228H${stage===3?183:368}"/></circle><text x="144" y="288" class="filter-label">${escapeHTML(t('filterMembrane'))}</text><circle cx="39" cy="307" r="4" fill="#315f7d"/><text x="50" y="312" class="filter-label">${escapeHTML(t('filterWaste'))}</text><circle cx="280" cy="307" r="8" fill="#a7503e"/><text x="296" y="312" class="filter-label">${escapeHTML(t('filterProtein'))}</text></svg>`;
}
function stopMotionIfNeeded(root) {
  root.querySelectorAll('svg').forEach(svg=>{const reduced=isReducedMotion();if(reduced)svg.pauseAnimations?.();else svg.unpauseAnimations?.();svg.querySelectorAll('animateMotion').forEach(animation=>{animation.parentElement.style.visibility=reduced?'hidden':'visible';});});
}
function renderPart() {
  const parts = content().parts;
  const selected = parts.find(part=>part.id===activePart) || parts[0];
  document.getElementById('part-index').textContent = String(parts.indexOf(selected)+1).padStart(2,'0');
  document.getElementById('part-title').textContent = selected.title;
  document.getElementById('part-description').textContent = selected.description;
  const controls = document.getElementById('part-buttons');
  const focused = document.activeElement?.dataset.partChoice;
  controls.innerHTML = parts.map(part=>`<button data-part-choice="${part.id}" aria-pressed="${part.id===activePart}">${escapeHTML(part.title)}</button>`).join('');
  document.querySelectorAll('.kidney-hotspot').forEach(point=>{
    const part = parts.find(p=>p.id===point.dataset.part);
    point.setAttribute('aria-label',part.title);
    point.setAttribute('aria-pressed',String(part.id===activePart));
  });
  if(focused)controls.querySelector(`[data-part-choice="${focused}"]`)?.focus({preventScroll:true});
}
function renderFilter() {
  const slider = document.getElementById('filter-stage');
  const stage = Number(slider.value);
  const copy = content().filterStages[stage];
  slider.setAttribute('aria-valuetext',`${t('filterStageAccessible',{number:stage+1})}: ${copy.title}`);
  document.getElementById('filter-stage-title').textContent = copy.title;
  document.getElementById('filter-stage-description').textContent = copy.description;
  const drawing = document.getElementById('filter-diagram');
  drawing.innerHTML = filterSVG(stage);
  stopMotionIfNeeded(drawing);
}
export function initKidneyExplorer() {
  const studio = document.getElementById('kidney-visual');
  studio.innerHTML = data.kidney;
  translateDOM(studio);
  const select = (id)=>{activePart=id;renderPart();const panel=document.querySelector('.studio-caption');panel.scrollIntoView({behavior:isReducedMotion()?'instant':'smooth',block:'nearest'});panel.classList.add('part-focused');setTimeout(()=>panel.classList.remove('part-focused'),1600);};
  studio.addEventListener('click',event=>{const hotspot=event.target.closest('[data-part]');if(hotspot)select(hotspot.dataset.part);});
  studio.addEventListener('keydown',event=>{const hotspot=event.target.closest('[data-part]');if(hotspot && ['Enter',' '].includes(event.key)){event.preventDefault();select(hotspot.dataset.part);}});
  document.getElementById('part-buttons').addEventListener('click',event=>{const control=event.target.closest('[data-part-choice]');if(control)select(control.dataset.partChoice);});
  studio.addEventListener('pointermove',event=>{
    if(!matchMedia('(pointer:fine)').matches || isReducedMotion())return;
    const r=studio.getBoundingClientRect();studio.style.setProperty('--pointer-x',`${(event.clientX-r.left-r.width/2)*.012}px`);studio.style.setProperty('--pointer-y',`${(event.clientY-r.top-r.height/2)*.012}px`);
  });
  studio.addEventListener('pointerleave',()=>{studio.style.setProperty('--pointer-x','0px');studio.style.setProperty('--pointer-y','0px');});
  document.getElementById('explore-filter').addEventListener('click',()=>{document.getElementById('filter-comparison').hidden=false;renderFilter();document.getElementById('filter-comparison').scrollIntoView({behavior:isReducedMotion()?'instant':'smooth',block:'start'});document.getElementById('filter-stage').focus({preventScroll:true});});
  document.getElementById('close-filter').addEventListener('click',()=>{document.getElementById('filter-comparison').hidden=true;document.getElementById('explore-filter').focus({preventScroll:true});});
  document.getElementById('filter-stage').addEventListener('input',renderFilter);
  on(EVENTOS.LANGUAGE,()=>{renderPart();renderFilter();translateDOM(studio);});
  matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',()=>{stopMotionIfNeeded(studio);stopMotionIfNeeded(document.getElementById('filter-diagram'));});
  initKidneyTools();
  renderPart();renderFilter();stopMotionIfNeeded(studio);
}
````

## js/kidney-tools.js

````javascript
// Comparación y repaso. El control representa cambios conceptuales, nunca años de evolución real.
import { EVENTOS, on } from './events.js';
import { data } from './data.js';
import { content, t, translateDOM } from './i18n.js';
import { escapeHTML as e, openDialog } from './ui.js';
import { isReducedMotion } from './preferences.js';
let compared=['corteza','glomerulo'],answers={},concept=45;
function specimen(prefix){return data.kidney.replace('role="group"','role="img"').replace(/id="kidney-/g,`id="${prefix}-kidney-`).replace('kidney-title kidney-desc',`${prefix}-kidney-title ${prefix}-kidney-desc`).replace(/<g class="kidney-hotspot"[\s\S]*?<\/g>/g,'').replace(/<circle[^>]*><animateMotion[\s\S]*?<\/circle>/g,'');}
function glomerulus(){const fraction=concept/100;const loops=Array.from({length:7},(_,i)=>{const x=38+i*22,y=70+(i%2)*15;return `<path d="M${x} ${y}q${8+fraction*6} ${-38+fraction*(i%2?15:-8)} 18 -3t${-10-fraction*9} 26q-21 4 -8 -23Z" fill="none" stroke="var(--coral)" stroke-width="${3+fraction*2}" opacity="${.45+fraction*.55}"/>`;}).join('');const flow=Array.from({length:Math.max(1,Math.round(7-fraction*5))},(_,i)=>`<circle class="concept-flow" cx="${25+i*24}" cy="135" r="3" fill="var(--blue)" style="--flow-delay:${i*.25}s;--flow-duration:${2+fraction*4}s"/>`).join('');return `<svg viewBox="0 0 220 180" role="img" aria-label="${e(t('conceptSlider'))}"><ellipse cx="110" cy="82" rx="94" ry="62" fill="var(--coral-soft)" stroke="var(--coral)" opacity=".8"/><path d="M12 83h30m137 0h29M20 135h180" stroke="var(--blue)" stroke-width="2" fill="none"/>${loops}${flow}</svg>`;}
export function initKidneyTools(){document.querySelector('.studio-tools').innerHTML=`<button id="compare-parts" class="text-link" data-i18n="compareParts">${e(t('compareParts'))}</button><button id="open-quiz" class="text-link" data-i18n="reviewQuiz">${e(t('reviewQuiz'))}</button>`;
 document.querySelector('.education-section').insertAdjacentHTML('beforebegin',`<section class="anatomy-comparison" id="part-comparison" hidden aria-labelledby="part-comparison-title"><div class="section-heading"><h2 id="part-comparison-title" data-i18n="compareParts">${e(t('compareParts'))}</h2><button id="close-part-comparison" class="icon-button" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><div class="part-comparison-grid" id="part-comparison-grid"></div></section><section class="concept-section" aria-labelledby="concept-title"><div class="section-heading"><div><p class="eyebrow" data-i18n="conceptSlider">${e(t('conceptSlider'))}</p><h2 id="concept-title" data-i18n="beforeAfter">${e(t('beforeAfter'))}</h2></div><span class="tag" data-i18n="notClinical">${e(t('notClinical'))}</span></div><div class="concept-layout"><div><div class="specimen-compare" id="specimen-compare"><div class="specimen-after">${specimen('after')}</div><div class="specimen-before">${specimen('before')}</div><div class="specimen-divider" aria-hidden="true"><span>↔</span></div><span class="specimen-label before" data-i18n="beforeLabel">${e(t('beforeLabel'))}</span><span class="specimen-label after" data-i18n="afterLabel">${e(t('afterLabel'))}</span></div><label for="concept-slider" class="sr-only" data-i18n="conceptSlider">${e(t('conceptSlider'))}</label><input id="concept-slider" type="range" min="0" max="100" step="1" value="45" aria-describedby="concept-disclaimer"><div class="concept-timeline">${[0,5,10,15].map((year,i)=>`<button data-concept-step="${Math.round(i*100/3)}">${e(t('conceptTimeline',{year}))}</button>`).join('')}</div></div><aside class="glomerulus-surface"><div id="concept-glomerulus"></div><h3 id="concept-stage-title"></h3><p id="concept-stage-copy"></p><p id="concept-disclaimer" class="fine-print" data-i18n="conceptDisclaimer">${e(t('conceptDisclaimer'))}</p></aside></div></section>`);
 document.body.insertAdjacentHTML('beforeend',`<dialog id="quiz-dialog" class="sheet-dialog" aria-labelledby="quiz-title"><div class="dialog-heading"><h2 id="quiz-title" data-i18n="quizTitle">${e(t('quizTitle'))}</h2><button class="icon-button" data-close-dialog="quiz-dialog" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><form id="quiz-form"><div id="quiz-questions"></div><button class="button primary" data-i18n="checkAnswers">${e(t('checkAnswers'))}</button><p id="quiz-result" role="status"></p></form></dialog>`);
 document.getElementById('compare-parts').addEventListener('click',()=>{document.getElementById('part-comparison').hidden=false;renderComparison();document.getElementById('part-comparison').scrollIntoView({behavior:isReducedMotion()?'instant':'smooth',block:'start'});document.getElementById('compare-part-0').focus({preventScroll:true});});document.getElementById('close-part-comparison').addEventListener('click',()=>{document.getElementById('part-comparison').hidden=true;document.getElementById('compare-parts').focus();});
 document.getElementById('part-comparison-grid').addEventListener('change',event=>{if(event.target.dataset.comparePart){compared[Number(event.target.dataset.comparePart)]=event.target.value;renderComparison();document.getElementById(event.target.id)?.focus();}});
 document.getElementById('concept-slider').addEventListener('input',event=>{concept=Number(event.target.value);renderConcept();});document.querySelector('.concept-timeline').addEventListener('click',event=>{const button=event.target.closest('[data-concept-step]');if(button){concept=Number(button.dataset.conceptStep);document.getElementById('concept-slider').value=concept;renderConcept();}});
 document.getElementById('open-quiz').addEventListener('click',()=>{answers={};renderQuiz();openDialog('quiz-dialog');});document.getElementById('quiz-form').addEventListener('change',event=>{if(event.target.name.startsWith('question-'))answers[event.target.name]=event.target.value;});document.getElementById('quiz-form').addEventListener('submit',event=>{event.preventDefault();let score=0;content().reviewQuestions.forEach((q,i)=>{const correct=answers['question-'+i]===q.answer;if(correct)score++;document.getElementById('quiz-feedback-'+i).textContent=(correct?'✓ '+t('quizCorrect'):'○ '+t('quizTry'))+' · '+content().parts.find(p=>p.id===q.answer).description;});document.getElementById('quiz-result').textContent=t('quizScore',{score});});
 on(EVENTOS.LANGUAGE,()=>{renderConcept();renderComparison();if(document.getElementById('quiz-dialog').open)renderQuiz();translateDOM(document.getElementById('specimen-compare'));});renderConcept();
}
function renderComparison(){document.getElementById('part-comparison-grid').innerHTML=compared.map((id,i)=>{const part=content().parts.find(p=>p.id===id);return `<article><label class="form-field"><span>${e(t(i?'comparisonPartB':'comparisonPartA'))}</span><select id="compare-part-${i}" data-compare-part="${i}">${content().parts.map(p=>`<option value="${p.id}" ${p.id===id?'selected':''}>${e(p.title)}</option>`).join('')}</select></label><span class="large-part-index">${String(content().parts.indexOf(part)+1).padStart(2,'0')}</span><h3>${e(part.title)}</h3><p>${e(part.description)}</p></article>`;}).join('');}
function renderConcept(){const stage=Math.min(3,Math.floor(concept/25)),copy=content().filterStages[stage];document.getElementById('specimen-compare').style.setProperty('--split',(100-concept)+'%');document.getElementById('specimen-compare').style.setProperty('--damage',concept/100);document.getElementById('concept-glomerulus').innerHTML=glomerulus();document.getElementById('concept-stage-title').textContent=copy.title;document.getElementById('concept-stage-copy').textContent=copy.description;document.getElementById('concept-slider').setAttribute('aria-valuetext',copy.title+' · '+t('conceptDisclaimer'));document.querySelectorAll('[data-concept-step]').forEach((button,i)=>{button.textContent=t('conceptTimeline',{year:[0,5,10,15][i]});button.setAttribute('aria-pressed',String(Math.abs(Number(button.dataset.conceptStep)-concept)<17));});}
function renderQuiz(){document.getElementById('quiz-questions').innerHTML=content().reviewQuestions.map((q,i)=>`<fieldset class="quiz-question"><legend>${i+1}. ${e(q.question)}</legend>${content().parts.map(part=>`<label class="checkbox-control"><input type="radio" name="question-${i}" value="${part.id}" ${answers['question-'+i]===part.id?'checked':''} required>${e(part.title)}</label>`).join('')}<p id="quiz-feedback-${i}" class="fine-print"></p></fieldset>`).join('');document.getElementById('quiz-result').textContent='';}
````

## js/measurements.js

````javascript
import { clinicalReady } from './clinical.js';
import { renderHomeTracking } from './home-tracking.js';
import { EVENTOS, on } from './events.js';
// Captura, filtros y visualización de mediciones; referencias configurables.
import { data } from './data.js';
import { t, formatNumber, formatDate, language } from './i18n.js';
import { getState, updateState, localDate, shiftDate, demoRecords } from './store.js';
import { escapeHTML, icon, toast, openDialog, closeDialog, confirmAction, emptyState } from './ui.js';
import { makeChart, attachChartTooltip } from './charts.js';
import { measurementCSV, measurementKeys } from './csv.js';
import { getVisibleRecords, getChartSeries } from './selectors.js';
import { initTrackingTools, renderTrackingTools } from './tracking-tools.js';
let selectedMetric = 'glucose';
let selectedPeriod = '30';
const fieldKeys = measurementKeys;
export function visibleRecords() {
  const state=getState();
  const records=state.dataMode==='demo'?demoRecords():state.records;
  const from=document.getElementById('date-from').value,to=document.getElementById('date-to').value;
  const start=selectedPeriod==='all'?null:shiftDate(localDate(),-(Number(selectedPeriod)-1));
  return getVisibleRecords(state,{records,start,from,to,tag:document.getElementById('record-tag-filter')?.value||''});
}
function valueStatus(value, metric, mode) {
  if(value===null||value===undefined)return null;
  const rule=data.ranges.metrics[metric].exampleRules;
  if(!rule || (mode!=='demo'&&!clinicalReady()))return {className:'pending',label:t('reviewPending')};
  const type=value>=rule.within[0]&&value<=rule.within[1]?'within':value>=rule.attention[0]&&value<=rule.attention[1]?'attention':'consult';
  return {className:type,label:t((mode==='demo'?'example':'reference')+({within:'Within',attention:'Attention',consult:'Consult'}[type]))};
}
function renderTable(records, mode) {
  const target=document.getElementById('results-table');
  if(!records.length){target.innerHTML=emptyState(getState().records.length||mode==='demo'?'noFilteredRecords':'noRecords','noRecordsHint');return;}
  target.innerHTML=`<table class="results-table"><caption class="sr-only">${escapeHTML(t('tableFullData'))}</caption><thead><tr><th scope="col">${escapeHTML(t('date'))}</th>${fieldKeys.map(key=>`<th scope="col" data-metric="${key}">${escapeHTML(t(key))}<br><small>${escapeHTML(data.ranges.metrics[key].unit)}</small></th>`).join('')}<th scope="col">${escapeHTML(t('notes'))}</th><th scope="col">${escapeHTML(t('tags'))}</th><th scope="col">${escapeHTML(t('status'))}<br><small>${escapeHTML(t(selectedMetric))}</small></th>${mode==='personal'?`<th scope="col">${escapeHTML(t('actions'))}</th>`:''}</tr></thead><tbody>${records.slice().reverse().map(record=>{
    const status=valueStatus(record[selectedMetric],selectedMetric,mode);
    return `<tr><td>${escapeHTML(formatDate(record.date,{day:'2-digit',month:'short',year:'numeric'}))}</td>${fieldKeys.map(key=>`<td data-metric="${key}">${record[key]===null||record[key]===undefined?'—':escapeHTML(formatNumber(record[key],key==='creatinine'?2:1))}</td>`).join('')}<td class="record-note-cell">${escapeHTML(record.notes||'')}</td><td>${(record.tags||[]).map(tag=>escapeHTML(t('tag-'+tag))).join(', ')}</td><td>${status?`<span class="status-badge ${status.className}">${escapeHTML(status.label)}</span>`:'—'}</td>${mode==='personal'?`<td><button class="icon-button" data-delete-record="${escapeHTML(record.id)}" aria-label="${escapeHTML(t('deleteRecord',{date:formatDate(record.date)}))}">${icon('trash',18)}</button></td>`:''}</tr>`;
  }).join('')}</tbody></table><p class="table-explanation">${escapeHTML(t('resultsCount',{count:records.length}))} · ${escapeHTML(t(mode==='demo'?'demoTableNote':'personalTableNote'))}</p>`;
}
export function renderMeasurements() {
  const state=getState(),mode=state.dataMode,records=visibleRecords();
  document.getElementById('data-mode-tag').textContent=t(mode==='demo'?'demoMode':'realMode');
  document.getElementById('data-mode-description').textContent=t(mode==='demo'?'demoDescription':'realDescription');
  document.getElementById('toggle-demo').textContent=t(mode==='demo'?'showReal':'showDemo');
  document.querySelector('.data-mode-bar').classList.toggle('personal',mode==='personal');
  document.getElementById('clear-records').disabled=mode==='demo'||state.records.length===0;
  const select=document.getElementById('metric-select');
  select.innerHTML=fieldKeys.map(key=>`<option value="${key}">${escapeHTML(t(key))}</option>`).join('');select.value=selectedMetric;
  document.getElementById('chart-heading').textContent=t(selectedMetric);
  document.getElementById('metric-unit').textContent=data.ranges.metrics[selectedMetric].unit;
  const values=getChartSeries(state,selectedMetric,{records});
  document.getElementById('latest-value').textContent=values.length?formatNumber(values.at(-1).value,selectedMetric==='creatinine'?2:1):'—';
  document.getElementById('metric-delta').textContent=values.length>1?t('chartDelta',{delta:formatNumber(values.at(-1).value-values[0].value,2),unit:data.ranges.metrics[selectedMetric].unit}):values.length?t('chartSingle'):t('noChartData');
  const chart=document.getElementById('trend-chart');
  chart.innerHTML=makeChart(values,selectedMetric,mode,{width:chart.clientWidth||640,height:chart.clientWidth<480?230:260});
  const showBand=(mode==='demo'||clinicalReady())&&data.ranges.metrics[selectedMetric].exampleBand;
  document.getElementById('chart-caption').textContent=t(showBand?'chartSampleBand':'chartNoBand');
  renderTable(records,mode);renderHomeTracking();renderTrackingTools();
  document.getElementById('visit-questions').innerHTML=['visitQuestion1','visitQuestion2','visitQuestion3'].map(key=>`<li>${escapeHTML(t(key))}</li>`).join('');
}
function renderFields() {
  const form=document.getElementById('record-form');
  const draft=Object.fromEntries([...form.querySelectorAll('input,textarea')].map(input=>[input.name,input.value]));
  const tags=[...form.querySelectorAll('[name=tags]:checked')].map(input=>input.value);
  const hints={glucose:'glucoseFormHint',egfr:'egfrFormHint',uacr:'uacrFormHint'};
  document.getElementById('record-fields').innerHTML=`<label class="form-field" for="record-date"><span>${escapeHTML(t('dateRequired'))}</span><input id="record-date" name="date" type="date" required max="${localDate()}" value="${escapeHTML(draft.date||localDate())}" aria-describedby="record-date-hint"><span id="record-date-hint" class="field-hint">${escapeHTML(t('recordDateHint'))}</span></label>${fieldKeys.map(key=>{
    const config=data.ranges.metrics[key];
    return `<label class="form-field" data-metric="${key}" for="record-${key}"><span>${escapeHTML(t(key))}</span><span class="unit-label">${escapeHTML(config.unit)} · ${escapeHTML(t('optional'))}</span><input id="record-${key}" data-metric="${key}" name="${key}" type="number" inputmode="decimal" min="${config.technicalMin}" max="${config.technicalMax}" step="${config.step}" value="${escapeHTML(draft[key]||'')}" placeholder="—" aria-describedby="hint-${key}"><span id="hint-${key}" class="field-hint">${escapeHTML(hints[key]?t(hints[key]):t('fieldUnits',{unit:config.unit}))}</span></label>`;
  }).join('')}<label class="form-field record-extra"><span>${escapeHTML(t('notes'))}</span><textarea name="notes" maxlength="280" rows="3" aria-describedby="record-notes-hint">${escapeHTML(draft.notes||'')}</textarea><span id="record-notes-hint" class="field-hint">${escapeHTML(t('recordNotesHint'))}</span></label><fieldset class="record-extra"><legend>${escapeHTML(t('tags'))}</legend>${['fasting','post-dinner','visit'].map(tag=>`<label class="checkbox-control"><input type="checkbox" name="tags" value="${tag}" ${tags.includes(tag)?'checked':''}>${escapeHTML(t('tag-'+tag))}</label>`).join('')}</fieldset><p class="fine-print" style="grid-column:1/-1">${escapeHTML(t('formUnitsNote'))}</p>`;
}
function renderReferences() {
  document.getElementById('reference-content').innerHTML=`<div class="reference-content"><span class="tag demo-tag">${escapeHTML(t('validationPending'))}</span><p style="margin-top:1rem">${escapeHTML(t('referencesDisclaimer'))}</p><table class="reference-table"><tbody>${fieldKeys.filter(key=>data.ranges.metrics[key].exampleBand).map(key=>`<tr><td>${escapeHTML(t(key))}</td><td>${data.ranges.metrics[key].exampleBand.map(n=>formatNumber(n,2)).join('–')} ${escapeHTML(data.ranges.metrics[key].unit)}</td></tr>`).join('')}</tbody></table><p>${escapeHTML(t('referencesIndividual'))}</p><p class="fine-print">${escapeHTML(t('unitsDisclaimer'))}</p></div>`;
}
function exportCSV() {
  const records=visibleRecords();if(!records.length){toast(t('emptyExport'));return;}
  const mode=getState().dataMode;
  const labels=Object.fromEntries(['date',...fieldKeys].map(key=>[key,t(key)]));
  const csv=measurementCSV(records,{language:language(),mode,metrics:data.ranges.metrics,labels});
  const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));link.download=`renal-${mode}-${localDate()}.csv`;link.hidden=true;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),1000);toast(t('exported'));
}
function saveRecord(event) {
  event.preventDefault();const form=event.currentTarget,error=document.getElementById('record-error');error.textContent='';
  if(!form.reportValidity())return;
  const input=new FormData(form),date=input.get('date');
  if(!date||!/^\d{4}-\d{2}-\d{2}$/.test(date)){error.textContent=t('invalidRecord');return;}
  if(date>localDate()){error.textContent=t('futureRecord');return;}
  const record={id:crypto.randomUUID?crypto.randomUUID():`record-${Date.now()}-${Math.random().toString(36).slice(2)}`,date};
  for(const key of fieldKeys){const raw=input.get(key);record[key]=raw===''?null:Number(raw);const config=data.ranges.metrics[key];if(record[key]!==null&&(!Number.isFinite(record[key])||record[key]<config.technicalMin||record[key]>config.technicalMax)){error.textContent=t('formRangeError');return;}}
  if(fieldKeys.every(k=>record[k]===null)){error.textContent=t('invalidRecord');return;}
  if((record.systolic!==null)!==(record.diastolic!==null)||(record.systolic!==null&&record.systolic<=record.diastolic)){error.textContent=t('pressurePair');return;}
  record.notes=String(input.get('notes')||'');record.tags=input.getAll('tags');
  if(!updateState({records:[...getState().records,record],dataMode:'personal'})){error.textContent=t('saveFailed');return;}
  closeDialog('record-dialog');form.reset();renderFields();toast(t('recordSaved'));
}
export function initMeasurements() {
  initTrackingTools({render:renderMeasurements,visibleRecords,metric:()=>selectedMetric,setMetric:value=>{selectedMetric=value;},allRecords:()=>getState().dataMode==='demo'?demoRecords():getState().records});
  document.getElementById('add-record').addEventListener('click',()=>{renderFields();document.getElementById('record-error').textContent='';openDialog('record-dialog');});
  document.getElementById('record-form').addEventListener('submit',saveRecord);
  document.getElementById('record-form').addEventListener('input',()=>{document.getElementById('record-error').textContent='';});
  document.getElementById('toggle-demo').addEventListener('click',()=>{if(!updateState({dataMode:getState().dataMode==='demo'?'personal':'demo'}))toast(t('saveFailed'));});
  document.getElementById('metric-select').addEventListener('change',event=>{selectedMetric=event.target.value;renderMeasurements();});
  document.querySelectorAll('[data-period]').forEach(button=>button.addEventListener('click',()=>{selectedPeriod=button.dataset.period;document.querySelectorAll('[data-period]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderMeasurements();}));
  ['date-from','date-to'].forEach(id=>document.getElementById(id).addEventListener('change',()=>{const from=document.getElementById('date-from').value,to=document.getElementById('date-to').value;if(from&&to&&from>to)toast(t('invalidDates'));renderMeasurements();}));
  document.getElementById('reset-dates').addEventListener('click',()=>{document.getElementById('date-from').value='';document.getElementById('date-to').value='';renderMeasurements();});
  document.getElementById('export-csv').addEventListener('click',exportCSV);
  document.getElementById('show-ranges').addEventListener('click',()=>{renderReferences();openDialog('reference-dialog');});
  document.getElementById('clear-records').addEventListener('click',async()=>{if(getState().dataMode==='demo'){toast(t('demoClearNote'));return;}if(await confirmAction(t('deleteTitle'),t('deleteDescription'))){if(updateState({records:[]}))toast(t('deleted'));else toast(t('saveFailed'));}});
  document.getElementById('results-table').addEventListener('click',async event=>{const button=event.target.closest('[data-delete-record]');if(!button)return;if(await confirmAction(t('deleteTitle'),t('deleteOneDescription'))){if(updateState({records:getState().records.filter(r=>r.id!==button.dataset.deleteRecord)}))toast(t('deleted'));else toast(t('saveFailed'));}});
  on(EVENTOS.STATE,event=>{if(event.detail.keys.some(k=>['records','dataMode'].includes(k)))renderMeasurements();});
  on(EVENTOS.LANGUAGE,()=>{renderFields();renderReferences();renderMeasurements();});
  on(EVENTOS.ROUTE,event=>{if(event.detail.route==='seguimiento'||event.detail.route==='descubrir')renderMeasurements();});
  let resizeTimer,lastWidth=0;const resize=new ResizeObserver(entries=>{const width=Math.round(entries[0].contentRect.width);if(width===lastWidth||width===0)return;lastWidth=width;clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(!document.getElementById('route-seguimiento').hidden)renderMeasurements();},150);});resize.observe(document.getElementById('trend-chart'));
  attachChartTooltip(document.getElementById('trend-chart'));
  renderFields();renderReferences();renderMeasurements();
}
````

## js/preferences.js

````javascript
import { EVENTOS, on } from './events.js';
import { getState } from './store.js';
export function isReducedMotion(){return getState().motion==='reduce'||matchMedia('(prefers-reduced-motion:reduce)').matches;}
export function applyPreferences(){const state=getState(),dark=state.theme==='dark'||(state.theme==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.dataset.motion=isReducedMotion()?'reduced':'enabled';document.querySelectorAll('svg').forEach(svg=>{if(isReducedMotion())svg.pauseAnimations?.();else svg.unpauseAnimations?.();svg.querySelectorAll('animateMotion').forEach(node=>{node.parentElement.style.visibility=isReducedMotion()?'hidden':'visible';});});}
export function initPreferences(){applyPreferences();on(EVENTOS.STATE,applyPreferences);matchMedia('(prefers-color-scheme:dark)').addEventListener('change',applyPreferences);matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',applyPreferences);}
````

## js/presentation.js

````javascript
import { EVENTOS, on } from './events.js';
// Nueve escenas para la exposición, con controles y teclado.
import { data } from './data.js';
import { content, t, translateDOM, language } from './i18n.js';
import { demoRecords } from './store.js';
import { escapeHTML, openDialog, closeDialog, toast } from './ui.js';
import { filterSVG } from './kidney-explorer.js';
import { makeChart, metricValues } from './charts.js';
import { openPrintView } from './print.js';
import { isReducedMotion } from './preferences.js';
let slide = 0, timerStart=0, elapsed=0, paused=false, timerId=0, notesVisible=false;
let fullscreenOwned = false;
const totalSlides = 9;
function cleanKidney() {
  // La ilustración de la diapositiva no contiene controles duplicados.
  return data.kidney.replace(/id="kidney-/g,'id="slide-kidney-').replace('kidney-title kidney-desc','slide-kidney-title slide-kidney-desc').replace(/tabindex="0"/g,'tabindex="-1"').replace(/role="button"/g,'role="presentation"').replace(/class="kidney-hotspot"/g,'class="slide-hotspot"');
}
export function presentationSlides() {
  const s=content().sections;
  return [
    {eyebrow:'slideLearning',title:t('heroTitle')+' '+t('heroAccent'),description:t('slideKidneyDescription'),visual:cleanKidney()},
    {eyebrow:'slideLearning',title:s[0].title,description:s[0].description,visual:`<div class="slide-number">01</div>${s[0].points.slice(0,3).map(point=>`<div class="slide-step">${escapeHTML(point)}</div>`).join('')}`},
    {eyebrow:'slideLearning',title:t('filterTitle'),description:content().filterStages[2].description,visual:filterSVG(2)},
    {eyebrow:'slideLearning',title:s[3].title,description:t('slideLabDescription'),visual:`<div class="slide-number">02</div><div class="slide-step">${escapeHTML(t('egfr'))}</div><div class="slide-step">${escapeHTML(t('uacr'))}</div><p class="fine-print">${escapeHTML(t('silentNote'))}</p>`},
    {eyebrow:'slideCare',title:s[2].title,description:t('slidePreventionDescription'),visual:`<div class="slide-number">30 × 5</div><p>${escapeHTML(t('habitSource'))}</p><p class="fine-print">${escapeHTML(t('habitNote'))}</p>`},
    {eyebrow:'slideTrack',title:t('trackTitle'),description:t('slideDemoNote'),visual:`${makeChart(metricValues(demoRecords(),'glucose'),'glucose','demo',{width:500,height:280})}<p class="fine-print">${escapeHTML(t('chartSampleBand'))}</p>`},
    {eyebrow:'slideFood',title:t('foodTitle'),description:t('slideFoodDescription'),visual:`${data.recipes.slice(0,3).map(recipe=>`<div class="mini-recipe">${escapeHTML(recipe[document.documentElement.lang].title)}</div>`).join('')}<p class="fine-print">${escapeHTML(t('recipeExample'))}</p>`},
    {eyebrow:'slideCare',title:t('habitsTitle'),description:t('slideHabitsDescription'),visual:`<div class="slide-number">06</div>${content().habits.slice(0,4).map(habit=>`<div class="slide-step">${escapeHTML(habit.title)}</div>`).join('')}`},
    {eyebrow:'slideConnect',title:t('slideThanks'),description:t('slideQuestion'),visual:`<div class="university-list">${content().universities.map(name=>`<span>${escapeHTML(name)}</span>`).join('')}</div><p class="fine-print">${escapeHTML(t('slideSources'))}</p>`}
  ];
}
function renderSlide() {
  if(slide===-1){document.getElementById('presentation-slide').innerHTML=`<div class="waiting-scene"><p class="eyebrow">COIL / 2026</p><h2>${escapeHTML(t('waitingTitle'))}</h2><time id="waiting-clock"></time><p>${escapeHTML(t('waitingHint'))}</p></div>`;document.getElementById('slide-counter').textContent='0 / 9';document.getElementById('slide-prev').disabled=true;document.getElementById('slide-next').disabled=false;document.getElementById('slide-dots').innerHTML='';renderNotes();updateTimer();return;}
  const current=presentationSlides()[slide],target=document.getElementById('presentation-slide');
  target.innerHTML=`<div class="slide-content"><p class="eyebrow">${escapeHTML(t(current.eyebrow))} / COIL</p><h2>${escapeHTML(current.title)}</h2><p>${escapeHTML(current.description)}</p></div><div class="slide-visual">${current.visual}</div>`;
  translateDOM(target);
  if(isReducedMotion())target.querySelectorAll('svg').forEach(svg=>svg.pauseAnimations?.());
  document.getElementById('slide-counter').textContent=t('slideOf',{current:slide+1,total:totalSlides});
  document.getElementById('slide-prev').disabled=slide===0;
  document.getElementById('slide-next').disabled=slide===totalSlides-1;
  document.getElementById('slide-dots').innerHTML=Array.from({length:totalSlides},(_,index)=>`<button data-slide="${index}" ${slide===index?'aria-current="step"':''} aria-label="${escapeHTML(t('slideGo',{number:index+1}))}"></button>`).join('');
  target.setAttribute('aria-live','polite');renderNotes();
}
function move(direction) {slide=Math.max(0,Math.min(totalSlides-1,slide+direction));renderSlide();}
export function initPresentation() {
  const dialog=document.getElementById('presentation-dialog');
  document.querySelector('.presentation-top').insertAdjacentHTML('beforeend',`<div class="presentation-extra-tools"><time id="presentation-timer" aria-label="${escapeHTML(t('timer'))}">00:00</time><button id="presentation-pause" class="text-link" aria-label="${escapeHTML(t('shortcutPause'))}" aria-pressed="false">Ⅱ</button><button id="presentation-notes-toggle" class="text-link" data-i18n="presenterNotes">${escapeHTML(t('presenterNotes'))}</button><button id="presentation-export" class="text-link" data-i18n="presentationExport">${escapeHTML(t('presentationExport'))}</button></div>`);
  document.getElementById('presentation-slide').insertAdjacentHTML('afterend',`<aside id="presenter-notes" class="presenter-notes" hidden><h3 data-i18n="presenterNotes">${escapeHTML(t('presenterNotes'))}</h3><p id="presenter-notes-copy"></p><small data-i18n="notesFullscreen">${escapeHTML(t('notesFullscreen'))}</small></aside>`);
  document.getElementById('presentation-notes-toggle').addEventListener('click',toggleNotes);
  document.getElementById('presentation-pause').addEventListener('click',pauseTimer);
  document.getElementById('presentation-export').addEventListener('click',()=>openPrintView(t('presentation'),presentationSlides().map((scene,i)=>`<article class="print-scene"><div class="slide-content"><p class="eyebrow">renal / COIL · ${i+1} / 9</p><h2>${escapeHTML(scene.title)}</h2><p>${escapeHTML(scene.description)}</p></div><div class="slide-visual">${scene.visual}</div></article>`).join(''),{slides:true}));
  // El visor ocupa toda la ventana; el modo nativo se solicita con este control.
  document.getElementById('fullscreen-presentation').addEventListener('click',async()=>{
    try {
      if (!dialog.requestFullscreen) {toast(t('fullscreenUnavailable'));return;}
      if (!document.fullscreenElement) {await dialog.requestFullscreen();fullscreenOwned=true;}
    } catch {toast(t('fullscreenUnavailable'));}
  });
  document.getElementById('close-presentation').addEventListener('click',()=>closeDialog('presentation-dialog'));
  document.getElementById('slide-prev').addEventListener('click',()=>move(-1));
  document.getElementById('slide-next').addEventListener('click',()=>move(1));
  document.getElementById('slide-dots').addEventListener('click',event=>{const button=event.target.closest('[data-slide]');if(button){slide=Number(button.dataset.slide);renderSlide();}});
  dialog.addEventListener('keydown',event=>{if(event.key.toLowerCase()==='n'){event.preventDefault();toggleNotes();}if(event.shiftKey&&event.key.toLowerCase()==='r'){event.preventDefault();resetTimer();}if(event.shiftKey&&event.key.toLowerCase()==='p'){event.preventDefault();pauseTimer();}if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();if(event.key==='Home')slide=0;else if(event.key==='End')slide=totalSlides-1;else slide=Math.max(0,Math.min(totalSlides-1,slide+(event.key==='ArrowRight'?1:-1)));renderSlide();}if(event.key==='Escape'){event.preventDefault();closeDialog('presentation-dialog');}});
  dialog.addEventListener('close',()=>{clearInterval(timerId);if(fullscreenOwned&&document.fullscreenElement){document.exitFullscreen?.().catch(()=>{});}fullscreenOwned=false;});
  document.addEventListener('fullscreenchange',()=>{renderNotes();if(fullscreenOwned&&!document.fullscreenElement&&dialog.open){fullscreenOwned=false;dialog.close();}});
  on(EVENTOS.LANGUAGE,()=>{if(dialog.open)renderSlide();});
}

export function openPresentation(waiting=false){slide=waiting?-1:0;notesVisible=false;resetTimer();clearInterval(timerId);timerId=setInterval(updateTimer,1000);renderSlide();openDialog('presentation-dialog');}
function resetTimer(){elapsed=0;timerStart=performance.now();paused=false;updateTimer();}
function pauseTimer(){if(!paused)elapsed+=performance.now()-timerStart;else timerStart=performance.now();paused=!paused;updateTimer();}
function updateTimer(){const element=document.getElementById('presentation-timer');if(!element)return;const seconds=Math.floor((elapsed+(paused?0:performance.now()-timerStart))/1000);element.textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');document.getElementById('presentation-pause').setAttribute('aria-pressed',String(paused));document.getElementById('presentation-pause').textContent=paused?'▷':'Ⅱ';const clock=document.getElementById('waiting-clock');if(clock){const now=new Date();clock.textContent=new Intl.DateTimeFormat(language()==='es'?'es-CO':'en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(now);clock.dateTime=now.toISOString();}}
function toggleNotes(){notesVisible=!notesVisible;renderNotes();}
function renderNotes(){const panel=document.getElementById('presenter-notes');if(!panel)return;panel.hidden=!notesVisible||!!document.fullscreenElement;document.getElementById('presenter-notes-copy').textContent=slide<0?t('waitingHint'):(data.presentation[language()][slide]||'');document.getElementById('presentation-notes-toggle').setAttribute('aria-pressed',String(notesVisible&&!document.fullscreenElement));document.getElementById('presentation-dialog').classList.toggle('with-presenter-notes',!panel.hidden);}
````

## js/print.js

````javascript
// Vistas de impresión independientes: sin interfaz, colores de clasificación ni animaciones.
import { t, language } from './i18n.js';
import { escapeHTML as e } from './ui.js';
import { toast } from './ui.js';
export function openPrintView(title,body,{slides=false,landscape=false}={}){const view=window.open('','_blank');if(!view){toast(t('printBlocked'));return false;}const staticBody=body.replace(/<animate(?:Motion|Transform)?\b[^>]*\/>/g,'').replace(/<animate(?:Motion|Transform)?\b[\s\S]*?<\/animate(?:Motion|Transform)?>/g,'').replace(/tabindex="0"/g,'');view.document.write(`<!doctype html><html lang="${language()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${e(title)}</title><style>@page{size:A4 ${slides||landscape?'landscape':'portrait'};margin:14mm}*{box-sizing:border-box}body{font:14px/1.5 Arial,sans-serif;color:#17231f;margin:32px auto;padding:0 24px;max-width:1100px}h1{font:36px/1.1 Georgia,serif}h2{font:28px Georgia,serif}h3{font-size:18px}p{white-space:pre-line}table{width:100%;border-collapse:collapse;font-size:11px;margin:24px 0}th,td{padding:7px 5px;border-bottom:1px solid #aeb5b1;text-align:left}th{vertical-align:bottom}svg{width:100%;max-height:280px}svg text{fill:#17231f;font:12px Arial}path,polyline{animation:none}.chart-line{fill:none;stroke:#17231f;stroke-width:2}.chart-gridline{stroke:#d1d5d3}.chart-point{fill:#17231f}.chart-tooltip{display:none}.print-note{border:1px solid #87928d;padding:16px;min-height:110px}button{font:inherit;padding:12px 18px;background:#173e36;color:white;border:0;border-radius:4px;cursor:pointer}.print-actions{position:sticky;top:0;background:white;padding:12px 0;border-bottom:1px solid #ccc}.print-scene{break-after:page;min-height:155mm;display:grid;grid-template-columns:1fr 1fr;gap:35px;align-items:center;border-bottom:1px solid #ccc;padding:28px 0}.print-scene:last-child{break-after:auto}.slide-number{font:75px Georgia}.slide-step,.mini-recipe{padding:12px;border-bottom:1px solid #ccc}.slide-visual>svg{max-height:330px}.slide-content h2{font-size:40px}.fine-print{font-size:12px}.kidney-hotspot,.slide-hotspot{opacity:0}.filter-dot{fill:#555}.protein-dot{fill:#777}.filter-label{fill:#222}.university-list{display:grid;gap:24px}.eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:1px}@media print{body{margin:0;padding:0;max-width:none}.print-actions{display:none}table{font-size:11px}tr{break-inside:avoid}.print-scene{border:0;padding:0}h1,h2,h3{break-after:avoid}}</style></head><body><div class="print-actions"><button onclick="window.print()">${e(t('print'))}</button></div>${staticBody}</body></html>`);view.document.close();return true;}
````

## js/recipe-tools.js

````javascript
import { EVENTOS, on } from './events.js';
import { data } from './data.js';
import { language, t, formatNumber } from './i18n.js';
import { getState, updateState } from './store.js';
import { escapeHTML as e, toast, confirmAction, icon } from './ui.js';
import { downloadText, datedName } from './files.js';

export function scaledIngredients(recipe, servings, lang=language()) {
  return recipe.ingredientAmounts.map(item=>({
    label:item[lang], pluralLabel:item[lang+'Plural']||item[lang],
    amount:item.amount===null?null:item.amount*servings/recipe.servings
  }));
}
export function ingredientText(item) {
  const label=item.amount!==null&&item.amount!==1?(item.pluralLabel||item.label):item.label;
  return (item.amount===null?'':formatNumber(item.amount,2)+' ')+label;
}
export function renderShopping() {
  const state=getState(), list=document.getElementById('shopping-items');
  if(!list)return;
  const items=new Map();
  for(const entry of state.shoppingList) {
    const recipe=data.recipes.find(r=>r.id===entry.recipeId);
    if(!recipe)continue;
    for(const item of scaledIngredients(recipe,entry.servings)) {
      const previous=items.get(item.label);
      items.set(item.label,{...item,amount:item.amount===null?null:(previous?.amount||0)+item.amount});
    }
  }
  list.innerHTML=items.size
    ?`<ul>${[...items.values()].map(item=>`<li><span class="shopping-dot" aria-hidden="true"></span><span>${e(ingredientText(item))}</span></li>`).join('')}</ul>`
    :`<div class="shopping-empty"><span class="card-symbol" aria-hidden="true">${icon('basket',25)}</span><div><strong>${e(t('shoppingEmptyTitle'))}</strong><p>${e(t('shoppingEmpty'))}</p></div></div>`;
  document.getElementById('shopping-count').textContent=t('shoppingCount',{count:items.size});
  document.getElementById('shopping-export').disabled=!items.size;
  document.getElementById('shopping-clear').disabled=!items.size;
  document.getElementById('renal-food-warning').hidden=state.declaredEgfr===null||state.declaredEgfr>=60;
}
export function initRecipeTools(render) {
  document.querySelector('.recipe-toggle-filters').insertAdjacentHTML('beforeend',`<label><input id="recipe-unvalidated" type="checkbox"><span data-i18n="onlyUnvalidated">${e(t('onlyUnvalidated'))}</span></label>`);
  document.querySelector('.food-notice').insertAdjacentHTML('afterend',`<aside id="renal-food-warning" class="notice renal-food-warning" hidden><div class="notice-icon" aria-hidden="true">${icon('warning',22)}</div><div class="notice-content"><p data-i18n="renalFoodWarning">${e(t('renalFoodWarning'))}</p></div></aside>`);
  document.getElementById('route-alimentacion').insertAdjacentHTML('beforeend',`<section class="shopping-surface" aria-labelledby="shopping-title"><div class="section-heading"><div class="shopping-heading"><span class="card-symbol" aria-hidden="true">${icon('basket',25)}</span><div><p class="eyebrow" data-i18n="shoppingEyebrow">${e(t('shoppingEyebrow'))}</p><h2 id="shopping-title" data-i18n="shoppingList">${e(t('shoppingList'))}</h2></div></div><div class="tool-row"><button id="shopping-export" class="button secondary">${icon('download',18)}<span data-i18n="exportText">${e(t('exportText'))}</span></button><button id="shopping-clear" class="text-link danger-text">${icon('trash',18)}<span data-i18n="shoppingClear">${e(t('shoppingClear'))}</span></button></div></div><span id="shopping-count" class="shopping-count" aria-live="polite"></span><div id="shopping-items"></div><p class="fine-print" data-i18n="nutritionAmount">${e(t('nutritionAmount'))}</p></section>`);
  document.getElementById('recipe-unvalidated').addEventListener('change',render);
  document.getElementById('shopping-export').addEventListener('click',()=>{
    downloadText(t('shoppingList')+'\n\n'+[...document.querySelectorAll('#shopping-items li')].map(li=>li.textContent).join('\n')+'\n\n'+t('nutritionAmount'),datedName('renal-compras','txt'));
  });
  document.getElementById('shopping-clear').addEventListener('click',async()=>{
    if(!await confirmAction(t('shoppingClear'),t('shoppingClearHint')))return;
    if(updateState({shoppingList:[]}))toast(t('shoppingCleared'));
    else toast(t('saveFailed'));
  });
  on(EVENTOS.STATE,event=>{
    if(event.detail.keys.some(k=>['shoppingList','declaredEgfr','activeProfile'].includes(k)))renderShopping();
  });
  on(EVENTOS.LANGUAGE,renderShopping);
  renderShopping();
}
export function shoppingAdd(recipeId, servings) {
  if(updateState({shoppingList:[...getState().shoppingList,{recipeId,servings}]}))toast(t('shoppingAdded'));
  else toast(t('saveFailed'));
}
````

## js/recipes.js

````javascript
import { EVENTOS, on } from './events.js';
// Búsqueda, filtros, favoritas y detalle de recetas bilingües.
import { data } from './data.js';
import { language, t } from './i18n.js';
import { getState, updateState } from './store.js';
import { escapeHTML, icon, toast, openDialog, emptyState } from './ui.js';
let selectedMeal = 'all';
let openedRecipe = null;
const mealKeys=['all','breakfast','lunch','dinner','snack'];
import { getRecipeList } from './selectors.js';
import { scaledIngredients, ingredientText, initRecipeTools, shoppingAdd } from './recipe-tools.js';
let portionCount=1, initialized=false;
// Ilustraciones decorativas: no representan porciones ni información nutricional.
function recipeIllustration(id) {
  const art={
    avena:'<ellipse cx="90" cy="64" rx="41" ry="22" fill="#ddc79f"/><path d="M48 63c4 39 80 39 84 0" fill="#c1d5de"/><ellipse cx="90" cy="61" rx="41" ry="20" fill="#e8d7b5"/><path d="m66 52 13-5 7 12-14 5m22-12 13-3 5 11-14 5" fill="#ca8170"/><path d="m85 47 12 8m-27 11 11 5m20-10 12 4" stroke="#ac8c63" stroke-width="2" stroke-linecap="round"/>',
    pollo:'<path d="M59 54c12-17 50-18 62 2 10 20-12 39-39 35-29-4-40-24-23-37Z" fill="#d4a276" stroke="#b58762" stroke-width="2"/><path d="m70 51 35 24m-45-9 33 23" stroke="#b4845e" stroke-width="3" stroke-linecap="round"/><path d="M121 43a19 19 0 0 1 5 35l-7-18Z" fill="#efcf73" stroke="#d3b457" stroke-width="2"/><path d="m62 84-10 7m10-7-3-10m3 10 11 5" stroke="#779875" stroke-width="3" stroke-linecap="round"/>',
    arroz:'<ellipse cx="89" cy="65" rx="40" ry="26" fill="#e5d9b5"/><path d="m66 57 7 3m13-13 6 4m11 4 8 1m-52 17 7-2m16 0 7 3m13-2 7-4m-30 15 6-1" stroke="#fcf9ee" stroke-width="4" stroke-linecap="round"/><g fill="#a8c49a" stroke="#73926a" stroke-width="2"><ellipse cx="57" cy="68" rx="9" ry="12"/><ellipse cx="119" cy="66" rx="10" ry="13"/></g><path d="m86 57 3 7 7-4m-7 4-3 9" stroke="#72906b" stroke-width="2" fill="none"/>',
    pepino:'<g fill="#d8e6bc" stroke="#7c9b72" stroke-width="4"><ellipse cx="61" cy="66" rx="17" ry="19"/><ellipse cx="86" cy="56" rx="17" ry="19"/><ellipse cx="111" cy="68" rx="17" ry="19"/></g><g fill="#b4cd96"><circle cx="61" cy="66" r="6"/><circle cx="86" cy="56" r="6"/><circle cx="111" cy="68" r="6"/></g><path d="M127 43a16 16 0 0 1 0 30l-8-15Z" fill="#efd27a" stroke="#d5b455" stroke-width="2"/>',
    pescado:'<path d="M47 74c7-27 39-39 74-27l15 23c-22 22-56 28-89 4Z" fill="#e3bba1" stroke="#c7987c" stroke-width="2"/><path d="m65 62 8 18m7-26 9 22m7-27 11 21" stroke="#f6d9c4" stroke-width="3" stroke-linecap="round"/><path d="m63 85 23-6m-19 7 3 5m7-7 2 5" stroke="#7d9d79" stroke-width="3" stroke-linecap="round"/><path d="M116 80a16 16 0 0 0 11-27l-11 14Z" fill="#efcf73"/>',
    tostada:'<path d="M51 40c2-15 75-15 78 0v47H51Z" fill="#c69b6d" stroke="#a67b51" stroke-width="3"/><path d="M59 43c6-10 56-10 62 0v35H59Z" fill="#e4c394"/><path d="M64 51c6-15 20-13 28-10 20-5 34 24 13 36-14 8-49-7-41-26Z" fill="#fffaf0"/><circle cx="90" cy="58" r="13" fill="#e6bd57"/><path d="m67 77 8-9m34-24 5 7m-11 27 8-7" stroke="#789b73" stroke-width="3" stroke-linecap="round"/>',
    coliflor:'<path d="M49 80c21 22 67 22 81-3l-19-4-38-2Z" fill="#8faa7b"/><g fill="#f6f0dc" stroke="#d1cbb6" stroke-width="2"><circle cx="68" cy="63" r="18"/><circle cx="92" cy="51" r="20"/><circle cx="114" cy="65" r="18"/><circle cx="88" cy="75" r="20"/></g><g fill="#b88759"><circle cx="71" cy="62" r="2"/><circle cx="100" cy="51" r="2"/><circle cx="88" cy="78" r="2"/></g>',
    pera:'<path d="M79 38c-1 20-28 27-26 48 2 22 60 22 67 1 7-23-22-30-24-49Z" fill="#c8d495" stroke="#9eb270" stroke-width="2"/><path d="M86 36c0-8 4-14 10-17" stroke="#987758" stroke-width="4" stroke-linecap="round"/><path d="M88 28c14-13 26-4 28 2-11 5-22 3-28-2Z" fill="#87a779"/><path d="m67 80 30-12m-25 20 29-10" stroke="#ab8d64" stroke-width="2" stroke-linecap="round"/>'
  };
  return `<svg viewBox="0 0 180 120" aria-hidden="true"><ellipse cx="90" cy="98" rx="58" ry="8" fill="#173e36" opacity=".08"/><ellipse cx="90" cy="67" rx="69" ry="43" fill="#fffdfa" stroke="#d8ddd5" stroke-width="2"/><ellipse cx="90" cy="67" rx="55" ry="32" fill="#fbfaf5" stroke="#e8e9df"/>${art[id]||''}</svg>`;
}
function favoriteButton(recipe) {
  const saved=getState().favorites.includes(recipe.id),copy=recipe[language()];
  return `<button class="favorite-button" data-favorite="${recipe.id}" aria-pressed="${saved}" aria-label="${escapeHTML(t(saved?'removeFavorite':'saveFavorite',{title:copy.title}))}">${icon('heart',19)}</button>`;
}
export function renderRecipeDetail() {
  const recipe=data.recipes.find(r=>r.id===openedRecipe);if(!recipe)return;
  const copy=recipe[language()];
  document.getElementById('recipe-detail').innerHTML=`<div class="dialog-heading"><div><p class="eyebrow">${escapeHTML(t('recipeShortBadge'))} / ${escapeHTML(t(recipe.meal))}</p><h2 id="recipe-dialog-title">${escapeHTML(copy.title)}</h2><div class="recipe-detail-meta"><span>${recipe.minutes} ${escapeHTML(t('minutes'))}</span><span id="recipe-portions-summary">${escapeHTML(t('servings',{count:portionCount}))}</span>${favoriteButton(recipe)}</div><div class="portion-controls"><label><span>${escapeHTML(t('servingsControl'))}</span><input id="recipe-portions" type="number" inputmode="numeric" min="1" max="24" step="1" value="${portionCount}"></label><button id="add-shopping" class="button secondary" data-shopping-recipe="${recipe.id}">${escapeHTML(t('addShopping'))}</button></div></div><button class="icon-button" data-close-dialog="recipe-dialog" aria-label="${escapeHTML(t('close'))}">×</button></div><span class="tag demo-tag">${escapeHTML(t('recipeExample'))}</span><div class="recipe-detail-grid"><div><h3>${escapeHTML(t('ingredients'))}</h3><ul id="recipe-ingredients">${scaledIngredients(recipe,portionCount).map(ingredient=>`<li>${escapeHTML(ingredientText(ingredient))}</li>`).join('')}</ul></div><div><h3>${escapeHTML(t('preparation'))}</h3><ol>${copy.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol></div></div><aside class="recipe-detail-note"><strong>${escapeHTML(t('reviewNote'))}</strong><p>${escapeHTML(copy.note)}</p></aside><aside class="recipe-detail-note"><strong>${escapeHTML(t('substitutions'))}</strong><ul>${copy.substitutions.map(item=>`<li>${escapeHTML(item)}</li>`).join('')}</ul></aside><p class="fine-print">${escapeHTML(t('nutritionAmount'))}</p><p class="fine-print">${escapeHTML(t('dietNote'))}</p>`;
}
export function renderRecipes() {
  const focusedMeal=document.activeElement?.dataset.meal;
  const focusedFavorite=document.activeElement?.dataset.favorite;
  const focusOwner=document.activeElement?.closest('#recipe-detail')?'recipe-detail':'recipe-grid';
  document.getElementById('recipe-meal-filters').innerHTML=mealKeys.map(meal=>`<button data-meal="${meal}" aria-pressed="${meal===selectedMeal}">${escapeHTML(t(meal==='all'?'allMeals':meal))}</button>`).join('');
  const recipes=getRecipeList(getState(),data.recipes,{language:language(),query:document.getElementById('recipe-search').value,lessSalt:document.getElementById('recipe-sodium').checked,favorites:document.getElementById('recipe-favorites').checked,meal:selectedMeal,status:document.getElementById('recipe-unvalidated').checked?'sample-unvalidated':''});
  document.getElementById('recipe-count').textContent=t('recipesFound',{count:recipes.length});
  const grid=document.getElementById('recipe-grid');
  grid.innerHTML=recipes.length?recipes.map(recipe=>{
    const copy=recipe[language()],index=data.recipes.findIndex(r=>r.id===recipe.id)+1;
    return `<article class="recipe-card"><div class="recipe-visual" data-meal="${recipe.meal}">${recipeIllustration(recipe.id)}<span class="recipe-number">${String(index).padStart(2,'0')}</span></div><div class="recipe-card-content"><div class="recipe-meta"><span>${escapeHTML(t(recipe.meal))}</span><span>${recipe.minutes} ${escapeHTML(t('minutes'))}</span></div><h2 class="recipe-title">${escapeHTML(copy.title)}</h2><p class="recipe-summary">${escapeHTML(copy.ingredients.slice(0,3).join(' · '))}</p><div class="recipe-card-bottom"><button class="text-link" data-open-recipe="${recipe.id}">${escapeHTML(t('recipeOpen'))}</button>${favoriteButton(recipe)}</div><p class="recipe-validation">${escapeHTML(t('recipeCardNote'))} / ${escapeHTML(t('reviewNutritionist'))}</p></div></article>`;
  }).join(''):emptyState('noRecipes',document.getElementById('recipe-favorites').checked?'noFavoriteYet':'ingredientNotFound',`<button class="button secondary" data-reset-recipe>${escapeHTML(t('clearRecipeFilters'))}</button>`);
  if(focusedMeal)document.querySelector(`[data-meal="${focusedMeal}"]`)?.focus({preventScroll:true});
  if(document.getElementById('recipe-dialog').open)renderRecipeDetail();
  if(focusedFavorite){const replacement=document.querySelector(`#${focusOwner} [data-favorite="${focusedFavorite}"]`);(replacement||document.getElementById('recipe-search')).focus({preventScroll:true});}
}
export function initRecipes() {
  if(initialized)return;initialized=true;initRecipeTools(renderRecipes);
  const reset=()=>{selectedMeal='all';document.getElementById('recipe-search').value='';document.getElementById('recipe-sodium').checked=false;document.getElementById('recipe-favorites').checked=false;document.getElementById('recipe-unvalidated').checked=false;renderRecipes();};
  document.getElementById('recipe-search').addEventListener('input',renderRecipes);
  document.getElementById('recipe-sodium').addEventListener('change',renderRecipes);
  document.getElementById('recipe-favorites').addEventListener('change',renderRecipes);
  document.getElementById('recipe-meal-filters').addEventListener('click',event=>{const button=event.target.closest('[data-meal]');if(button){selectedMeal=button.dataset.meal;renderRecipes();}});
  const recipeClick=event=>{
    const open=event.target.closest('[data-open-recipe]'),favorite=event.target.closest('[data-favorite]');
    if(open)openRecipeFromSearch(open.dataset.openRecipe);
    const shopping=event.target.closest('[data-shopping-recipe]');if(shopping)shoppingAdd(shopping.dataset.shoppingRecipe,portionCount);
    if(favorite){const saved=getState().favorites.includes(favorite.dataset.favorite);const next=saved?getState().favorites.filter(id=>id!==favorite.dataset.favorite):[...getState().favorites,favorite.dataset.favorite];if(updateState({favorites:next})){renderRecipes();toast(t(saved?'favoriteRemoved':'favoriteSaved'));}else toast(t('saveFailed'));}
    if(event.target.closest('[data-reset-recipe]'))reset();
  };
  document.getElementById('recipe-grid').addEventListener('click',recipeClick);
  document.getElementById('recipe-detail').addEventListener('click',recipeClick);
  document.getElementById('recipe-detail').addEventListener('input',event=>{if(event.target.id!=='recipe-portions')return;const value=Number(event.target.value);if(!Number.isInteger(value)||value<1||value>24)return;portionCount=value;const recipe=data.recipes.find(r=>r.id===openedRecipe);document.getElementById('recipe-ingredients').innerHTML=scaledIngredients(recipe,portionCount).map(item=>`<li>${escapeHTML(ingredientText(item))}</li>`).join('');document.getElementById('recipe-portions-summary').textContent=t('servings',{count:portionCount});});
  document.getElementById('recipe-detail').addEventListener('change',event=>{if(event.target.id==='recipe-portions'){const value=Number(event.target.value);if(!Number.isInteger(value)||value<1||value>24){event.target.value=portionCount;return;}portionCount=value;renderRecipeDetail();document.getElementById('recipe-portions').focus();}});
  on(EVENTOS.STATE,event=>{if(event.detail.keys.some(k=>['favorites','activeProfile'].includes(k)))renderRecipes();});
  on(EVENTOS.LANGUAGE,renderRecipes);
  renderRecipes();
}

export function openRecipeFromSearch(id){if(!initialized)initRecipes();openedRecipe=id;portionCount=data.recipes.find(r=>r.id===id)?.servings||1;renderRecipeDetail();openDialog('recipe-dialog');}
````

## js/router.js

````javascript
import { EVENTOS, emit } from './events.js';
// Navegación entre secciones mediante direcciones con #.
const routes = ['descubrir','seguimiento','alimentacion','habitos','senales','proyecto'];
let previousRoute = '';
export function currentRoute() {
  const [route,chapter] = location.hash.slice(1).split('/');
  return {route:routes.includes(route)?route:'descubrir',chapter:chapter||'causas'};
}
function applyRoute(initial = false) {
  const routeInfo = currentRoute();
  document.querySelectorAll('[data-view]').forEach(view=>{view.hidden=view.dataset.view!==routeInfo.route;});
  document.querySelectorAll('[data-route]').forEach(link=>{if(link.dataset.route===routeInfo.route)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  document.getElementById('main-nav').classList.remove('open');
  document.getElementById('mobile-menu').setAttribute('aria-expanded','false');
  if (!initial && previousRoute!==routeInfo.route) {window.scrollTo({top:0,behavior:'instant'});document.getElementById('main').focus({preventScroll:true});}
  previousRoute = routeInfo.route;
  emit(EVENTOS.ROUTE, routeInfo);
}
export function initRouter() {
  // La entrada visual se aplica con CSS. La navegación responde de inmediato.
  window.addEventListener('hashchange',()=>applyRoute());
  document.getElementById('mobile-menu').addEventListener('click',()=>{const open=document.getElementById('main-nav').classList.toggle('open');document.getElementById('mobile-menu').setAttribute('aria-expanded',String(open));});
  document.getElementById('main-nav').addEventListener('keydown',event=>{if(event.key==='Escape'){document.getElementById('main-nav').classList.remove('open');document.getElementById('mobile-menu').setAttribute('aria-expanded','false');document.getElementById('mobile-menu').focus();}});
  applyRoute(true);
}
````

## js/search.js

````javascript
// Índice bilingüe y navegación por teclado sin dependencias.
import { EVENTOS, on } from './events.js';
import { data, loadData } from './data.js';
import { language, t } from './i18n.js';
import { escapeHTML as e, openDialog, closeDialog } from './ui.js';
const normalize=text=>String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
let index=[],results=[],selected=0,gTimer=0,gPrefix=false;
const routes={descubrir:'navDiscover',seguimiento:'navTrack',alimentacion:'navFood',habitos:'navHabits',senales:'navSigns',proyecto:'credits'};
function bilingualText(list,id,fields){return ['es','en'].map(lang=>{const item=data[lang][list].find(value=>value.id===id);return fields.flatMap(field=>item?.[field]||'').join(' ');}).join(' ');}
function buildIndex(){index=[];for(const lang of ['es','en']){const copy=data[lang];for(const [route,key] of Object.entries(routes))index.push({type:'section',lang,title:copy[key]||route,text:route+' '+(data.es[key]||'')+' '+(data.en[key]||''),hash:route});copy.sections.forEach(chapter=>index.push({type:'chapter',lang,title:chapter.title,text:bilingualText('sections',chapter.id,['title','description','points']),hash:`descubrir/${chapter.id}`}));copy.habits.forEach(habit=>index.push({type:'habit',lang,title:habit.title,text:bilingualText('habits',habit.id,['title','detail']),hash:'habitos'}));data.recipes.forEach(recipe=>index.push({type:'recipe',lang,title:recipe[lang].title,text:['es','en'].flatMap(code=>[recipe[code].title,...recipe[code].ingredients]).join(' '),hash:'alimentacion',recipeId:recipe.id}));}}
function renderSearch(){const query=normalize(document.getElementById('global-search').value);results=index.filter(item=>item.lang===language()&&(!query||normalize(item.text).includes(query))).slice(0,30);selected=Math.min(selected,Math.max(0,results.length-1));document.getElementById('search-announcement').textContent=t('searchCount',{count:results.length});const html=[];for(const type of ['section','chapter','recipe','habit']){const grouped=results.map((r,i)=>({...r,i})).filter(r=>r.type===type);if(!grouped.length)continue;html.push(`<h3>${e(t(type))}</h3>${grouped.map(r=>`<button class="search-result" id="search-result-${r.i}" data-search-result="${r.i}" role="option" aria-selected="${r.i===selected}"><span>${e(r.title)}</span><small>${e(t(type))} ↗</small></button>`).join('')}`);}document.getElementById('search-results').innerHTML=html.join('')||`<p>${e(t('searchEmpty'))}</p>`;document.getElementById('global-search').setAttribute('aria-activedescendant',results.length?`search-result-${selected}`:'');}
async function go(index){const result=results[index];if(!result)return;closeDialog('search-dialog');location.hash=result.hash;if(result.recipeId){await loadData(['recipes']);const module=await import('./recipes.js');module.openRecipeFromSearch(result.recipeId);}}
export function initSearch(){document.body.insertAdjacentHTML('beforeend',`<dialog id="search-dialog" class="sheet-dialog search-dialog" aria-labelledby="search-title"><div class="dialog-heading"><h2 id="search-title" data-i18n="searchAll">${e(t('searchAll'))}</h2><button class="icon-button" data-close-dialog="search-dialog" aria-label="${e(t('close'))}" data-i18n-aria="close">×</button></div><input id="global-search" type="search" role="combobox" aria-expanded="true" aria-controls="search-results" aria-autocomplete="list" data-i18n-placeholder="searchPlaceholder" placeholder="${e(t('searchPlaceholder'))}" data-i18n-aria="searchAll" aria-label="${e(t('searchAll'))}"><p id="search-announcement" class="fine-print" aria-live="polite"></p><div id="search-results" role="listbox"></div></dialog><dialog id="shortcuts-dialog" class="sheet-dialog" aria-labelledby="shortcuts-title"><div class="dialog-heading"><h2 id="shortcuts-title" data-i18n="shortcuts">${e(t('shortcuts'))}</h2><button class="icon-button" data-close-dialog="shortcuts-dialog" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><div id="shortcut-list"></div></dialog>`);
  const shortcuts=()=>{document.getElementById('shortcut-list').innerHTML=`<dl class="shortcut-list"><dt><kbd>Ctrl / Cmd K</kbd></dt><dd>${e(t('searchAll'))}</dd><dt><kbd>?</kbd></dt><dd>${e(t('shortcuts'))}</dd><dt><kbd>,</kbd></dt><dd>${e(t('settings'))}</dd><dt><kbd>g d / s / a / h / n / j</kbd></dt><dd>${e(t('shortcutNav'))}<br>d: ${e(t('navDiscover'))}, s: ${e(t('navTrack'))}, a: ${e(t('navFood'))}, h: ${e(t('navHabits'))}, n: ${e(t('navSigns'))}, j: ${e(t('credits'))}</dd><dt><kbd>p</kbd></dt><dd>${e(t('shortcutPresentation'))}</dd><dt><kbd>N</kbd></dt><dd>${e(t('shortcutNotes'))}</dd><dt><kbd>Shift R / Shift P</kbd></dt><dd>${e(t('shortcutReset'))} / ${e(t('shortcutPause'))}</dd><dt><kbd>← → / Home / End</kbd></dt><dd>${e(t('presentation'))}</dd></dl>`;};shortcuts();
  document.getElementById('open-shortcuts').addEventListener('click',()=>openDialog('shortcuts-dialog'));
  document.getElementById('open-search').addEventListener('click',async()=>{await loadData(['recipes']);buildIndex();selected=0;renderSearch();openDialog('search-dialog');document.getElementById('global-search').focus();});
  document.getElementById('global-search').addEventListener('input',()=>{selected=0;renderSearch();});
  document.getElementById('search-results').addEventListener('click',event=>{const button=event.target.closest('[data-search-result]');if(button)go(Number(button.dataset.searchResult));});
  document.getElementById('search-dialog').addEventListener('keydown',event=>{
    // El input de búsqueda puede consumir Esc para borrar el texto antes de cerrar.
    if(event.key==='Escape'){
      event.preventDefault();event.stopPropagation();closeDialog('search-dialog');return;
    }
    if(['ArrowDown','ArrowUp'].includes(event.key)){
      event.preventDefault();selected=Math.max(0,Math.min(results.length-1,selected+(event.key==='ArrowDown'?1:-1)));
      renderSearch();document.getElementById(`search-result-${selected}`)?.scrollIntoView({block:'nearest',behavior:'instant'});
    }
    if(event.key==='Enter'&&event.target.id==='global-search'){event.preventDefault();go(selected);}
  });
  document.addEventListener('keydown',event=>{const editable=event.target.closest('input,textarea,select,[contenteditable=true]');if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();document.getElementById('open-search').click();return;}if(editable||event.ctrlKey||event.metaKey||event.altKey||document.querySelector('dialog[open]'))return;const key=event.key.toLowerCase();if(gPrefix){gPrefix=false;clearTimeout(gTimer);const route={d:'descubrir',s:'seguimiento',a:'alimentacion',h:'habitos',n:'senales',j:'proyecto'}[key];if(route){event.preventDefault();location.hash=route;return;}}if(key==='g'){gPrefix=true;gTimer=setTimeout(()=>{gPrefix=false;},1200);}if(event.key==='?'){event.preventDefault();openDialog('shortcuts-dialog');}if(key==='p'){event.preventDefault();document.getElementById('open-presentation').click();}if(key===','){event.preventDefault();document.getElementById('open-settings').click();}});
  on(EVENTOS.LANGUAGE,()=>{shortcuts();if(index.length){buildIndex();renderSearch();}});
}
````

## js/selectors.js

````javascript
// Selectores puros. La caché acotada conserva resultados congelados, nunca el estado mutable.
const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
function memo(fn){const cache=new Map();return(...args)=>{const key=JSON.stringify(args);if(cache.has(key))return cache.get(key);const result=freeze(fn(...args));if(cache.size>=40)cache.delete(cache.keys().next().value);cache.set(key,result);return result;};}
const normalized=value=>String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
export const getVisibleRecords=memo((state,filters={})=>(filters.records||state.records).filter(r=>(!filters.start||r.date>=filters.start)&&(!filters.from||r.date>=filters.from)&&(!filters.to||r.date<=filters.to)&&(!filters.tag||r.tags?.includes(filters.tag))).map(r=>structuredClone(r)).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id)));
export const getChartSeries=memo((state,metric,filters={})=>getVisibleRecords(state,filters).filter(r=>typeof r[metric]==='number'&&Number.isFinite(r[metric])).map(r=>({id:r.id,date:r.date,value:r[metric]})));
function previousDay(value){const date=new Date(`${value}T12:00:00`);date.setDate(date.getDate()-1);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function streak(marks,today,test){let date=today;if(!test(marks[date]||{}))date=previousDay(date);let count=0;while(test(marks[date]||{})&&count<3650){count++;date=previousDay(date);}return count;}
export const getHabitScore=memo((state,definitions,dates,today)=>{const marks=state.habits,total=definitions.reduce((n,h)=>n+h.target,0),done=definitions.reduce((n,h)=>n+Math.min(h.target,dates.filter(date=>marks[date]?.[h.id]===true).length),0);return {total,done,percent:total?Math.round(done/total*100):0,streak:streak(marks,today,m=>Object.values(m).some(Boolean)),perHabit:Object.fromEntries(definitions.map(h=>[h.id,streak(marks,today,m=>m[h.id]===true)]))};});
export const getRecipeList=memo((state,recipes,filters={})=>recipes.filter(r=>{const copy=r[filters.language||'es'],query=normalized(filters.query||'');return(!filters.meal||filters.meal==='all'||r.meal===filters.meal)&&(!filters.lessSalt||r.lessSaltIdea)&&(!filters.favorites||state.favorites.includes(r.id))&&(!filters.status||r.status===filters.status)&&(!query||normalized([copy.title,...copy.ingredients].join(' ')).includes(query));}).map(r=>structuredClone(r)));
````

## js/store.js

````javascript
// Migración conservadora: la copia anterior se guarda antes de escribir el esquema nuevo.
import { EVENTOS, emit } from './events.js';
export const SCHEMA_VERSION = 3;
export const STORAGE_KEY = 'renal-coil-v2';
export const metricNames = ['glucose','hba1c','systolic','diastolic','creatinine','egfr','uacr','weight'];
export const recordTags = ['fasting','post-dinner','visit'];
const profileFields = ['records','favorites','habits','habitNotes','shoppingList','professionalNotes','declaredEgfr'];
const newId = () => globalThis.crypto?.randomUUID?.() || `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const blankProfile = (name='Yo',id='local-main') => ({id,name,records:[],favorites:[],habits:{},habitNotes:{},shoppingList:[],professionalNotes:'',declaredEgfr:null});
const defaults = () => ({version:SCHEMA_VERSION,language:'es',theme:'system',motion:'system',onboarding:false,dataMode:'demo',activeProfile:'local-main',profiles:[blankProfile()]});
let state = defaults(), storageAvailable = true, recovery = null;
const clone = value => structuredClone(value);
export function localDate(date = new Date()) {return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function parseDate(date) {return new Date(`${date}T12:00:00`);}
export function shiftDate(date, days) {const result=parseDate(date);result.setDate(result.getDate()+days);return localDate(result);}
export function validDate(date) {return typeof date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(parseDate(date).valueOf())&&localDate(parseDate(date))===date;}
const object = value => value && typeof value==='object'&&!Array.isArray(value);
export function validateRecord(input) {
  if(!object(input)||typeof input.id!=='string'||!input.id||!validDate(input.date))throw new Error('Registro: identificador o fecha inválidos');
  const result={id:input.id,date:input.date};
  for(const key of metricNames){const value=input[key]??null;if(value!==null&&(typeof value!=='number'||!Number.isFinite(value)||value<0))throw new Error(`Registro: ${key} inválido`);result[key]=value;}
  if(metricNames.every(key=>result[key]===null))throw new Error('Registro sin mediciones');
  if((result.systolic===null)!==(result.diastolic===null)||(result.systolic!==null&&result.systolic<=result.diastolic))throw new Error('Presión: se requiere un par válido');
  if(input.notes!==undefined&&(typeof input.notes!=='string'||input.notes.length>280))throw new Error('Notas: máximo 280 caracteres');
  if(input.tags!==undefined&&(!Array.isArray(input.tags)||input.tags.some(tag=>!recordTags.includes(tag))))throw new Error('Etiquetas inválidas');
  result.notes=input.notes||'';result.tags=[...new Set(input.tags||[])];return result;
}
export function validateProfile(input) {
  if(!object(input)||typeof input.id!=='string'||!input.id||typeof input.name!=='string'||!input.name.trim()||input.name.length>60)throw new Error('Perfil inválido');
  if(!Array.isArray(input.records)||!Array.isArray(input.favorites)||!object(input.habits))throw new Error('El perfil requiere registros, favoritas y hábitos');
  const records=input.records.map(validateRecord);if(new Set(records.map(r=>r.id)).size!==records.length)throw new Error('Identificadores duplicados');
  if(input.favorites.some(id=>typeof id!=='string'))throw new Error('Favoritas inválidas');
  const habits={};for(const [date,marks] of Object.entries(input.habits)){if(!validDate(date)||!object(marks)||Object.entries(marks).some(([key,value])=>!/^[-\w]+$/.test(key)||typeof value!=='boolean'))throw new Error('Hábitos inválidos');habits[date]={...marks};}
  const habitNotes={};if(input.habitNotes!==undefined&&!object(input.habitNotes))throw new Error('Notas diarias inválidas');for(const [date,note] of Object.entries(input.habitNotes||{})){if(!validDate(date)||typeof note!=='string'||note.length>280)throw new Error('Nota diaria inválida');habitNotes[date]=note;}
  const shoppingList=input.shoppingList||[];if(!Array.isArray(shoppingList)||shoppingList.some(item=>!object(item)||typeof item.recipeId!=='string'||!Number.isInteger(item.servings)||item.servings<1||item.servings>24))throw new Error('Lista de compras inválida');
  const professionalNotes=input.professionalNotes||'';if(typeof professionalNotes!=='string'||professionalNotes.length>3000)throw new Error('Notas profesionales inválidas');
  const declaredEgfr=input.declaredEgfr??null;if(declaredEgfr!==null&&(typeof declaredEgfr!=='number'||!Number.isFinite(declaredEgfr)||declaredEgfr<0||declaredEgfr>250))throw new Error('TFGe declarada inválida');
  return {id:input.id,name:input.name.trim(),records,favorites:[...new Set(input.favorites)],habits,habitNotes,shoppingList:clone(shoppingList),professionalNotes,declaredEgfr};
}
export function validateState(input) {
  if(!object(input)||input.version!==SCHEMA_VERSION||!Array.isArray(input.profiles)||!input.profiles.length||input.profiles.length>30)throw new Error('Esquema de estado inválido');
  const profiles=input.profiles.map(validateProfile);if(new Set(profiles.map(p=>p.id)).size!==profiles.length||!profiles.some(p=>p.id===input.activeProfile))throw new Error('Perfil activo inválido');
  return {version:SCHEMA_VERSION,language:input.language==='en'?'en':'es',theme:['system','light','dark'].includes(input.theme)?input.theme:'system',motion:['system','reduce','full'].includes(input.motion)?input.motion:'system',onboarding:input.onboarding===true,dataMode:input.dataMode==='personal'?'personal':'demo',activeProfile:input.activeProfile,profiles};
}
export function migrate(fromVersion, input) {
  // v2 → v3: las colecciones pasan a un perfil. Ninguna fila se descarta silenciosamente.
  if(fromVersion===2){const next=defaults();next.language=input.language;next.dataMode=input.dataMode;next.onboarding=false;next.profiles=[validateProfile({...blankProfile(),records:input.records,favorites:input.favorites,habits:input.habits})];return validateState(next);}
  if(fromVersion===SCHEMA_VERSION)return validateState(input);
  throw new Error(`Versión no admitida: ${fromVersion}`);
}
export function initializeStore(storage=globalThis.localStorage) {
  state=defaults();storageAvailable=true;recovery=null;
  let raw=null;
  try {
    raw=storage.getItem(STORAGE_KEY);
    if(raw){const saved=JSON.parse(raw),next=migrate(saved.version,saved);if(saved.version!==SCHEMA_VERSION){storage.setItem(`${STORAGE_KEY}-before-v${SCHEMA_VERSION}`,raw);storage.setItem(STORAGE_KEY,JSON.stringify(next));console.info('[coil:migración]',`${saved.version} → ${SCHEMA_VERSION}`);}state=next;}
    else storage.setItem(STORAGE_KEY,JSON.stringify(state));
  }catch(error){storageAvailable=false;if(raw)recovery={raw,error:error.message};}
  return getState();
}
export function getState() {const profile=state.profiles.find(p=>p.id===state.activeProfile);return clone({...state,...Object.fromEntries(profileFields.map(key=>[key,profile[key]]))});}
export function canStore(){return storageAvailable&&!recovery;}
export function getRecovery(){return recovery?clone(recovery):null;}
export function updateState(changes) {
  if(recovery)return false;
  try {
    const next=clone(state),profile=next.profiles.find(p=>p.id===next.activeProfile);
    for(const [key,value] of Object.entries(changes)){if(profileFields.includes(key))profile[key]=clone(value);else if(key in next)next[key]=clone(value);}
    const validated=validateState(next);globalThis.localStorage.setItem(STORAGE_KEY,JSON.stringify(validated));state=validated;storageAvailable=true;
  }catch {storageAvailable=false;return false;}
  emit(EVENTOS.STATE,{keys:[...new Set([...Object.keys(changes),...(('activeProfile' in changes||'profiles' in changes)?profileFields:[])])],profileId:state.activeProfile});return true;
}
export function restartAfterBackup() {
  if(!recovery)return true;
  try {globalThis.localStorage.setItem(`${STORAGE_KEY}-recovery-original`,recovery.raw);const next=defaults();globalThis.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));state=next;recovery=null;storageAvailable=true;emit(EVENTOS.STATE,{keys:['profiles','activeProfile','records','habits','favorites']});return true;}catch{return false;}
}
export function createProfile(name){const profile=blankProfile(name,newId());if(!updateState({profiles:[...state.profiles,profile],activeProfile:profile.id,dataMode:'personal'}))return null;return profile.id;}
export function switchProfile(id){if(!state.profiles.some(p=>p.id===id))return false;return updateState({activeProfile:id});}
export function profileExport(){return {kind:'renal-coil-profile',schemaVersion:SCHEMA_VERSION,exportedAt:new Date().toISOString(),profile:clone(state.profiles.find(p=>p.id===state.activeProfile))};}
export function validateProfileExport(value){if(!object(value)||value.kind!=='renal-coil-profile'||value.schemaVersion!==SCHEMA_VERSION)throw new Error('Archivo de perfil: esquema no reconocido');return validateProfile(value.profile);}
export function importProfile(value){const profile=validateProfileExport(value);profile.id=newId();return updateState({profiles:[...state.profiles,profile],activeProfile:profile.id,dataMode:'personal'});}
export function demoRecords(){const values=[155,143,149,132,139,125,131,119,124,115,122,118];return values.map((glucose,i)=>({id:`demo-${i}`,date:shiftDate(localDate(),-(values.length-1-i)*3),glucose,hba1c:i===0?7.5:i===11?6.8:null,systolic:128+(i%3)*4,diastolic:76+(i%3)*2,creatinine:i%3===0?1.02:null,egfr:i%3===0?82+i:null,uacr:i%3===0?24-i:null,weight:74-i*.1,notes:'',tags:['fasting']}));}
try{initializeStore();}catch{storageAvailable=false;}
````

## js/symptoms.js

````javascript
import { EVENTOS, on } from './events.js';
// Orientación educativa sobre señales; no guarda la selección.
import { content, t } from './i18n.js';
import { escapeHTML, openDialog, icon } from './ui.js';
import { sourceLinks } from './education.js';
import { downloadText, datedName } from './files.js';
let consultationText='';
function selectedSymptoms() { return [...document.querySelectorAll('[data-symptom]:checked')].map(input=>input.dataset.symptom); }
function showGuidance() {
  const selected=selectedSymptoms(),urgent=content().symptomChecks.some(symptom=>symptom.urgent&&selected.includes(symptom.id));
  const result=document.getElementById('symptom-result');result.hidden=false;result.classList.toggle('urgent',urgent);
  const key=urgent?'alertUrgent':selected.length?'alertVisit':'alertNone';
  result.innerHTML=`<p class="guidance-label"><span class="guidance-icon" aria-hidden="true">${icon(urgent?'warning':'info',20)}</span> ${escapeHTML(t(urgent?'urgentAlert':'notDiagnosis'))}</p><h3>${escapeHTML(t(key))}</h3><p>${escapeHTML(t(key+'Note'))}</p><small>${escapeHTML(t('symptomsSelected',{count:selected.length}))}</small><p class="fine-print">${escapeHTML(t('signsDisclaimer'))}</p>`;
}
function renderSymptoms() {
  const selected=selectedSymptoms();
  document.getElementById('symptom-categories').innerHTML=content().symptomCategories.map((category,i)=>`<section class="symptom-category"><p class="small-label">0${i+1}</p><h2>${escapeHTML(category.title)}</h2><p>${escapeHTML(category.subtitle)}</p><ul>${category.items.map(item=>`<li>${escapeHTML(item)}</li>`).join('')}</ul></section>`).join('');
  document.getElementById('symptom-checks').innerHTML=content().symptomChecks.map(symptom=>`<label class="${symptom.urgent?'urgent-option':''}"><input type="checkbox" data-symptom="${symptom.id}" ${selected.includes(symptom.id)?'checked':''}><span>${escapeHTML(symptom.text)}</span></label>`).join('');
  document.getElementById('signs-sources').innerHTML=`${escapeHTML(t('sourceLabel'))}: <span class="chapter-sources">${sourceLinks(['mayo','niddk-tests','cdc-signs','medline'])}</span>`;
  if(!document.getElementById('symptom-result').hidden)showGuidance();
}
export function initSymptoms() {
  document.getElementById('check-symptoms').insertAdjacentHTML('afterend',`<button id="prepare-visit" class="text-link" data-i18n="prepareVisit">${escapeHTML(t('prepareVisit'))}</button>`);
  document.body.insertAdjacentHTML('beforeend',`<dialog id="questions-dialog" class="sheet-dialog" aria-labelledby="questions-title"><div class="dialog-heading"><h2 id="questions-title" data-i18n="questionsTitle">${escapeHTML(t('questionsTitle'))}</h2><button class="icon-button" data-close-dialog="questions-dialog" data-i18n-aria="close" aria-label="${escapeHTML(t('close'))}">×</button></div><div id="consultation-questions"></div><button id="questions-export" class="button secondary" data-i18n="exportText">${escapeHTML(t('exportText'))}</button></dialog>`);
  const prepare=()=>{const selected=selectedSymptoms(),urgent=content().symptomChecks.some(s=>s.urgent&&selected.includes(s.id));const questions=[...(urgent?[t('urgentQuestions')]:[]),...content().symptomChecks.filter(s=>selected.includes(s.id)).map(s=>t('symptomQuestion',{symptom:s.text})),t('visitQuestion1'),t('visitQuestion2'),t('visitQuestion3'),t('storyEnd')];consultationText=t('questionsTitle')+'\n\n'+questions.map(q=>'• '+q).join('\n');document.getElementById('consultation-questions').innerHTML=`${urgent?`<p class="notice urgent-text">⚠ ${escapeHTML(t('urgentQuestions'))}</p>`:''}<ul>${questions.map(q=>`<li>${escapeHTML(q)}</li>`).join('')}</ul>`;openDialog('questions-dialog');};
  document.getElementById('prepare-visit').addEventListener('click',prepare);
  document.getElementById('questions-export').addEventListener('click',()=>downloadText(consultationText,datedName('renal-preguntas','txt')));

  document.getElementById('check-symptoms').addEventListener('click',showGuidance);
  document.getElementById('symptom-checks').addEventListener('change',()=>{if(!document.getElementById('symptom-result').hidden||content().symptomChecks.some(s=>s.urgent&&selectedSymptoms().includes(s.id)))showGuidance();});
  on(EVENTOS.LANGUAGE,renderSymptoms);
  renderSymptoms();
}
````

## js/tracking-tools.js

````javascript
import { EVENTOS, on } from './events.js';
import { data } from './data.js';
import { t, formatNumber, formatDate } from './i18n.js';
import { getState, updateState, localDate, shiftDate } from './store.js';
import { getVisibleRecords } from './selectors.js';
import { escapeHTML as e, openDialog, closeDialog, toast } from './ui.js';
import { readMeasurementCSV, duplicateCount, mergeImportedRecords, measurementKeys } from './csv.js';
import { downloadText, datedName } from './files.js';
import { openPrintView } from './print.js';
import { makeChart } from './charts.js';
import { getChartSeries } from './selectors.js';
let api=null,imported=null,story='',comparisonChosen=false;
const labelMap=lang=>Object.fromEntries(['date',...measurementKeys].map(key=>[key,data[lang][key]]));
export function initTrackingTools(callbacks){api=callbacks;
 document.querySelector('.date-filters').insertAdjacentHTML('beforeend',`<label><span data-i18n="tags">${e(t('tags'))}</span><select id="record-tag-filter"><option value="" data-i18n="allTags">${e(t('allTags'))}</option>${['fasting','post-dinner','visit'].map(tag=>`<option value="${tag}" data-i18n="tag-${tag}">${e(t('tag-'+tag))}</option>`).join('')}</select></label>`);
 document.querySelector('.table-actions').insertAdjacentHTML('afterbegin',`<label class="button secondary"><span data-i18n="importCSV">${e(t('importCSV'))}</span><input id="import-csv" class="file-input" type="file" accept="text/csv,.csv" aria-label="${e(t('importCSV'))}"></label>`);
 document.querySelector('.data-mode-bar').insertAdjacentHTML('afterend',`<div class="tracking-tools tool-row"><label class="checkbox-control"><input id="quick-glucose" type="checkbox"><span data-i18n="quickGlucose">${e(t('quickGlucose'))}</span></label><button class="button secondary" id="story-open" data-i18n="myStory">${e(t('myStory'))}</button><button class="text-link" id="measurements-print" data-i18n="exportPDF">${e(t('exportPDF'))}</button><button class="text-link" id="consultation-print" data-i18n="consultation">${e(t('consultation'))}</button></div>`);
 document.querySelector('.results-section').insertAdjacentHTML('beforeend',`<section class="comparison-surface" aria-labelledby="comparison-title"><div><p class="eyebrow" data-i18n="compareDates">${e(t('compareDates'))}</p><h3 id="comparison-title" data-i18n="compareHint">${e(t('compareHint'))}</h3></div><div class="comparison-inputs"><label><span data-i18n="firstRecord">${e(t('firstRecord'))}</span><select id="compare-record-a"></select></label><label><span data-i18n="secondRecord">${e(t('secondRecord'))}</span><select id="compare-record-b"></select></label></div><p id="record-comparison" aria-live="polite"></p></section><label class="form-field professional-field"><span data-i18n="professionalNotes">${e(t('professionalNotes'))}</span><textarea id="professional-notes" maxlength="3000" rows="3" aria-describedby="professional-note-hint"></textarea><span id="professional-note-hint" class="field-hint" data-i18n="professionalHint">${e(t('professionalHint'))}</span></label>`);
 document.body.insertAdjacentHTML('beforeend',`<dialog id="csv-import-dialog" class="sheet-dialog" aria-labelledby="csv-import-title"><div class="dialog-heading"><h2 id="csv-import-title" data-i18n="importPreview">${e(t('importPreview'))}</h2><button class="icon-button" data-close-dialog="csv-import-dialog" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><p data-i18n="importCSVHint">${e(t('importCSVHint'))}</p><div id="csv-preview" class="csv-preview"></div><label class="form-field"><span data-i18n="duplicates">${e(t('compareDates'))}</span><select id="csv-duplicate-strategy"><option value="keep" data-i18n="keepBoth">${e(t('keepBoth'))}</option><option value="overwrite" data-i18n="overwrite">${e(t('overwrite'))}</option></select></label><p class="fine-print" data-i18n="importOrigin">${e(t('importOrigin'))}</p><button id="confirm-csv-import" class="button primary" data-i18n="importConfirm">${e(t('importConfirm'))}</button></dialog><dialog id="story-dialog" class="sheet-dialog" aria-labelledby="story-title"><div class="dialog-heading"><h2 id="story-title" data-i18n="storyTitle">${e(t('storyTitle'))}</h2><button class="icon-button" data-close-dialog="story-dialog" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><div id="story-content"></div><div class="tool-row"><button id="story-text" class="button secondary" data-i18n="exportText">${e(t('exportText'))}</button><button id="story-print" class="text-link" data-i18n="exportPDF">${e(t('exportPDF'))}</button></div></dialog>`);
 document.getElementById('record-tag-filter').addEventListener('change',api.render);
 document.getElementById('quick-glucose').addEventListener('change',event=>{document.getElementById('route-seguimiento').classList.toggle('glucose-only',event.target.checked);document.getElementById('record-dialog').classList.toggle('glucose-only',event.target.checked);if(event.target.checked)api.setMetric('glucose');api.render();});
 document.getElementById('professional-notes').addEventListener('change',event=>{if(!updateState({professionalNotes:event.target.value}))toast(t('saveFailed'));});
 ['compare-record-a','compare-record-b'].forEach(id=>document.getElementById(id).addEventListener('change',()=>{comparisonChosen=true;compare();}));
 document.getElementById('measurements-print').addEventListener('click',()=>printMeasurements(false));document.getElementById('consultation-print').addEventListener('click',()=>printMeasurements(true));
 document.getElementById('import-csv').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>1e6)throw new Error('size');imported=readMeasurementCSV(await file.text(),{metrics:data.ranges.metrics,esLabels:labelMap('es'),enLabels:labelMap('en'),today:localDate()});const matches=duplicateCount(getState().records,imported.accepted);document.getElementById('csv-preview').innerHTML=`<div class="import-summary"><strong>${e(t('acceptedRows',{count:imported.accepted.length}))}</strong><strong>${e(t('rejectedRows',{count:imported.rejected.length}))}</strong><span>${e(t('duplicates',{count:matches}))}</span></div><ul>${imported.accepted.slice(0,30).map(r=>`<li>✓ ${e(formatDate(r.date))} · ${measurementKeys.filter(k=>r[k]!==null).map(k=>`${e(t(k))}: ${e(formatNumber(r[k],2))}`).join(' · ')}</li>`).join('')}${imported.rejected.slice(0,30).map(r=>`<li class="danger-text">× ${r.line}: ${e(r.reason)}</li>`).join('')}</ul>`;document.getElementById('confirm-csv-import').disabled=!imported.accepted.length;openDialog('csv-import-dialog');}catch{toast(t('importInvalid'));}event.target.value='';});
 document.getElementById('confirm-csv-import').addEventListener('click',()=>{if(!imported?.accepted.length)return;const records=mergeImportedRecords(getState().records,imported.accepted,document.getElementById('csv-duplicate-strategy').value);if(updateState({records,dataMode:'personal'})){closeDialog('csv-import-dialog');imported=null;toast(t('recordSaved'));}else toast(t('saveFailed'));});
 document.getElementById('story-open').addEventListener('click',()=>{const state=getState(),records=getVisibleRecords(state,{start:shiftDate(localDate(),-29),to:localDate(),records:api.allRecords()});const lines=[t(state.dataMode==='demo'?'demoMode':'realMode'),t('storyCount',{count:records.length})];for(const key of measurementKeys){const values=getChartSeries(state,key,{records});if(values.length>1)lines.push(t('storyMetric',{metric:t(key),first:formatNumber(values[0].value,2),last:formatNumber(values.at(-1).value,2),delta:formatNumber(values.at(-1).value-values[0].value,2),unit:data.ranges.metrics[key].unit}));}lines.push(t('storyEnd'));story=lines.join('\n\n');document.getElementById('story-content').innerHTML=lines.map(line=>`<p>${e(line)}</p>`).join('');openDialog('story-dialog');});
 document.getElementById('story-text').addEventListener('click',()=>downloadText(story,datedName('renal-historia','txt')));document.getElementById('story-print').addEventListener('click',()=>openPrintView(t('storyTitle'),`<h1>${e(t('storyTitle'))}</h1><p>${e(story)}</p>`));
 on(EVENTOS.STATE,event=>{if(event.detail.keys.some(k=>['professionalNotes','activeProfile'].includes(k)))document.getElementById('professional-notes').value=getState().professionalNotes;});
 document.getElementById('professional-notes').value=getState().professionalNotes;
}
export function renderTrackingTools(){if(!api)return;const records=api.visibleRecords().filter(r=>typeof r[api.metric()]==='number');for(const [id,position] of [['compare-record-a',0],['compare-record-b',records.length-1]]){const select=document.getElementById(id),previous=select.value;select.innerHTML=records.map(r=>`<option value="${e(r.id)}">${e(formatDate(r.date,{day:'numeric',month:'short',year:'numeric'}))} · ${e(formatNumber(r[api.metric()],2))}</option>`).join('');select.value=comparisonChosen&&records.some(r=>r.id===previous)?previous:records[position]?.id||'';select.disabled=!records.length;}compare();}
function compare(){const records=api.visibleRecords(),a=records.find(r=>r.id===document.getElementById('compare-record-a').value),b=records.find(r=>r.id===document.getElementById('compare-record-b').value),key=api.metric();document.getElementById('record-comparison').textContent=a&&b?t('comparisonResult',{delta:formatNumber(b[key]-a[key],2),unit:data.ranges.metrics[key].unit,percent:a[key]===0?t('noPercent'):formatNumber((b[key]-a[key])/a[key]*100,2)+' %'}):t('noChartData');}
function printMeasurements(consultation){const records=api.visibleRecords(),state=getState(),metric=api.metric(),from=records[0]?.date||'—',to=records.at(-1)?.date||'—';const header=`<h1>${e(t(consultation?'consultation':'trackTitle'))}</h1><p>${e(state.profiles.find(p=>p.id===state.activeProfile).name)} · ${e(t(state.dataMode==='demo'?'demoMode':'realMode'))}</p><p>${e(t('periodPrinted',{from,to}))} · ${e(t('tags'))}: ${e(document.getElementById('record-tag-filter').selectedOptions[0].textContent)}</p><h2>${e(t(metric))} (${e(data.ranges.metrics[metric].unit)})</h2>${makeChart(getChartSeries(state,metric,{records}),metric,'consultation',{width:700,height:260,monochrome:true})}`;const table=`<table><thead><tr><th>${e(t('date'))}</th>${measurementKeys.map(key=>`<th>${e(t(key))}<br>${e(data.ranges.metrics[key].unit)}</th>`).join('')}<th>${e(t('notes'))}</th></tr></thead><tbody>${records.map(r=>`<tr><td>${e(r.date)}</td>${measurementKeys.map(key=>`<td>${r[key]===null?'—':e(formatNumber(r[key],2))}</td>`).join('')}<td>${e(r.notes)}${r.tags.length?' · '+e(r.tags.map(tag=>t('tag-'+tag)).join(', ')):''}</td></tr>`).join('')}</tbody></table>`;openPrintView(t('consultation'),header+table+`<h3>${e(t('professionalNotes'))}</h3><div class="print-note">${e(state.professionalNotes)}</div><p>${e(t('storyEnd'))}</p>`,{landscape:true});}
````

## js/ui.js

````javascript
// Controles comunes: ventanas, avisos y texto seguro.
import { t } from './i18n.js';
export function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
export function icon(name, size = 20) {
  const paths = {heart:'<path d="M20.5 4.9a5.5 5.5 0 0 0-7.8 0L12 5.6l-.7-.7a5.5 5.5 0 0 0-7.8 7.8L12 21l8.5-8.3a5.5 5.5 0 0 0 0-7.8Z"/>',check:'<path d="m5 12 4 4L19 6"/>',trash:'<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',person:'<circle cx="12" cy="5" r="3"/><path d="M7 11h10v7h-2v7h-6v-7H7Z"/>'};
  Object.assign(paths, {
    basket:'<path d="m7 8 3-5m7 5-3-5M3 8h18l-2 12H5L3 8Zm5 4v4m4-4v4m4-4v4"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
    warning:'<path d="M10 4a2.3 2.3 0 0 1 4 0l8 14a2 2 0 0 1-2 3H4a2 2 0 0 1-2-3L10 4Z"/><path d="M12 9v5m0 3v1"/>'
  });
  return `<svg viewBox="0 0 24 ${name==='person'?28:24}" width="${size}" height="${name==='person'?size*1.6:size}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.check}</svg>`;
}
let toastTimer;
export function toast(message) {
  const element = document.getElementById('toast');
  clearTimeout(toastTimer); element.textContent = message; element.hidden = false;
  toastTimer = setTimeout(()=>{element.hidden=true;},4200);
}
const dialogOpeners = new WeakMap();
export function openDialog(id) {
  const dialog = document.getElementById(id);
  if (!dialog.open) { dialogOpeners.set(dialog,document.activeElement); dialog.showModal(); }
}
export function closeDialog(id) { document.getElementById(id).close(); }
let confirmResolve = null;
export function confirmAction(title, description) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-description').textContent = description;
  openDialog('confirm-dialog');
  return new Promise(resolve=>{confirmResolve=resolve;});
}
export function initDialogs() {
  document.addEventListener('click',event=>{
    const closer=event.target.closest('[data-close-dialog]');
    if (closer) closeDialog(closer.dataset.closeDialog);
  });
  document.addEventListener('close',event=>{
    const dialog=event.target;if(!(dialog instanceof HTMLDialogElement))return;
    const opener=dialogOpeners.get(dialog);if(opener?.isConnected)opener.focus({preventScroll:true});
    if(dialog.id==='confirm-dialog'&&confirmResolve){confirmResolve(false);confirmResolve=null;}
  },true);
  document.addEventListener('click',event=>{
    const dialog=event.target;if(!(dialog instanceof HTMLDialogElement)||!dialog.open)return;
    const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  document.getElementById('confirm-cancel').addEventListener('click',()=>closeDialog('confirm-dialog'));
  document.getElementById('confirm-accept').addEventListener('click',()=>{const resolve=confirmResolve;confirmResolve=null;closeDialog('confirm-dialog');resolve?.(true);});
}
export function emptyState(title, description = '', button = '') { return `<div class="empty-state"><h3>${escapeHTML(t(title))}</h3>${description?`<p>${escapeHTML(t(description))}</p>`:''}${button}</div>`; }
````

## js/workspace.js

````javascript
// Preferencias y perfiles locales. La bienvenida permite seguir usando la página.
import { EVENTOS, on } from './events.js';
import { getState, updateState, createProfile, switchProfile, profileExport, validateProfileExport, importProfile, getRecovery, restartAfterBackup } from './store.js';
import { language, setLanguage, t, translateDOM } from './i18n.js';
import { escapeHTML as e, openDialog, closeDialog, toast, confirmAction } from './ui.js';
import { downloadText, datedName } from './files.js';
let step=0, imported=null, backupDownloaded=false;
export function initWorkspace(){
  document.querySelector('.header-tools').insertAdjacentHTML('afterbegin',`<button id="open-search" class="icon-button utility-button" data-i18n-aria="searchAll" aria-label="${e(t('searchAll'))}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg></button><button id="theme-toggle" class="icon-button utility-button" data-i18n-aria="theme" aria-label="${e(t('theme'))}" aria-pressed="false">☾</button><button id="open-settings" class="icon-button utility-button" data-i18n-aria="settings" aria-label="${e(t('settings'))}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="8" cy="18" r="2" fill="currentColor"/></svg></button>`);
  document.getElementById('workspace-strip-placeholder').outerHTML=`<div class="workspace-strip"><span class="fine-print" data-i18n="localOnly">${e(t('localOnly'))}</span><label class="profile-select"><span data-i18n="localProfile">${e(t('localProfile'))}</span><select id="profile-select" aria-label="${e(t('localProfile'))}"></select></label><button class="text-link" id="open-shortcuts" data-i18n="shortcuts">${e(t('shortcuts'))}</button><button id="install-app" class="text-link" data-i18n="install" hidden>${e(t('install'))}</button></div>`;
  document.body.insertAdjacentHTML('beforeend',`<aside id="welcome" class="welcome-panel" aria-labelledby="welcome-title" hidden><div class="welcome-top"><p class="eyebrow" id="welcome-step"></p><button id="welcome-skip" class="text-link" data-i18n="skipWelcome">${e(t('skipWelcome'))}</button></div><h2 id="welcome-title"></h2><div id="welcome-content"></div><button id="welcome-next" class="button primary"></button></aside><aside id="recovery-banner" class="recovery-banner" hidden><h2 data-i18n="recoveryTitle">${e(t('recoveryTitle'))}</h2><p data-i18n="recoveryHint">${e(t('recoveryHint'))}</p><button id="backup-original" class="button secondary" data-i18n="downloadBackup">${e(t('downloadBackup'))}</button><button id="restart-state" class="text-link" data-i18n="restart" disabled>${e(t('restart'))}</button></aside>
  <dialog id="settings-dialog" class="sheet-dialog" aria-labelledby="settings-title"><div class="dialog-heading"><h2 id="settings-title" data-i18n="settings">${e(t('settings'))}</h2><button class="icon-button" data-close-dialog="settings-dialog" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><form id="settings-form"><div class="settings-grid"><label class="form-field"><span data-i18n="language">${e(t('language'))}</span><select name="language"><option value="es">Español</option><option value="en">English</option></select></label><label class="form-field"><span data-i18n="theme">${e(t('theme'))}</span><select name="theme"><option value="system" data-i18n="systemTheme">${e(t('systemTheme'))}</option><option value="light" data-i18n="lightTheme">${e(t('lightTheme'))}</option><option value="dark" data-i18n="darkTheme">${e(t('darkTheme'))}</option></select></label><label class="form-field"><span data-i18n="motion">${e(t('motion'))}</span><select name="motion"><option value="system" data-i18n="systemMotion">${e(t('systemMotion'))}</option><option value="reduce" data-i18n="reduceMotion">${e(t('reduceMotion'))}</option><option value="full" data-i18n="allowMotion">${e(t('allowMotion'))}</option></select></label><label class="form-field"><span data-i18n="declaredEgfr">${e(t('declaredEgfr'))}</span><input name="declaredEgfr" type="number" inputmode="decimal" step="0.1" min="0" max="250" aria-describedby="declared-egfr-hint"><span class="field-hint" id="declared-egfr-hint" data-i18n="declaredEgfrHint">${e(t('declaredEgfrHint'))}</span></label></div><button class="button primary" data-i18n="saveSettings">${e(t('saveSettings'))}</button></form><section class="settings-profiles"><h3 data-i18n="localProfile">${e(t('localProfile'))}</h3><p class="fine-print" data-i18n="profilePrivacy">${e(t('profilePrivacy'))}</p><form id="new-profile-form" class="inline-form"><label><span data-i18n="profileName">${e(t('profileName'))}</span><input id="new-profile-name" required maxlength="60" autocomplete="off"></label><button class="button secondary" data-i18n="newProfile">${e(t('newProfile'))}</button></form><div class="tool-row"><button id="export-profile" class="text-link" data-i18n="profileExport">${e(t('profileExport'))}</button><label class="button secondary"><span data-i18n="profileImport">${e(t('profileImport'))}</span><input id="import-profile" class="file-input" type="file" accept="application/json,.json" aria-label="${e(t('profileImport'))}"></label><button id="delete-profile" class="text-link danger-text" data-i18n="deleteProfile">${e(t('deleteProfile'))}</button></div></section></dialog>
  <dialog id="profile-import-dialog" class="sheet-dialog" aria-labelledby="profile-import-title"><div class="dialog-heading"><h2 id="profile-import-title" data-i18n="importPreview">${e(t('importPreview'))}</h2><button class="icon-button" data-close-dialog="profile-import-dialog" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><p id="profile-import-preview"></p><p class="fine-print" data-i18n="profilePrivacy">${e(t('profilePrivacy'))}</p><button id="confirm-profile-import" class="button primary" data-i18n="importConfirm">${e(t('importConfirm'))}</button></dialog>
  <dialog id="privacy-dialog" class="sheet-dialog" aria-labelledby="privacy-title"><div class="dialog-heading"><h2 id="privacy-title" data-i18n="privacyTitle">${e(t('privacyTitle'))}</h2><button class="icon-button" data-close-dialog="privacy-dialog" data-i18n-aria="close" aria-label="${e(t('close'))}">×</button></div><p data-i18n="privacyBody">${e(t('privacyBody'))}</p><p class="notice" data-i18n="profilePrivacy">${e(t('profilePrivacy'))}</p><button class="text-link" id="privacy-settings" data-i18n="settings">${e(t('settings'))}</button></dialog>`);
  document.querySelector('.site-footer').insertAdjacentHTML('beforeend',`<button id="open-privacy" class="text-link" data-i18n="privacy">${e(t('privacy'))}</button>`);
  const refresh=()=>{const state=getState(),select=document.getElementById('profile-select');select.innerHTML=state.profiles.map(p=>`<option value="${e(p.id)}">${e(p.name)}</option>`).join('');select.value=state.activeProfile;select.setAttribute('aria-label',t('localProfile'));const button=document.getElementById('theme-toggle'),dark=document.documentElement.dataset.theme==='dark';button.textContent=dark?'☀':'☾';button.setAttribute('aria-pressed',String(dark));};
  document.getElementById('profile-select').addEventListener('change',event=>{if(!switchProfile(event.target.value))toast(t('saveFailed'));});
  document.getElementById('theme-toggle').addEventListener('click',()=>{if(!updateState({theme:document.documentElement.dataset.theme==='dark'?'light':'dark'}))toast(t('saveFailed'));});
  document.getElementById('open-settings').addEventListener('click',()=>{const state=getState(),form=document.getElementById('settings-form');for(const key of ['language','theme','motion','declaredEgfr'])form.elements[key].value=state[key]??'';openDialog('settings-dialog');});
  document.getElementById('settings-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget,values=new FormData(form);if(!form.reportValidity())return;if(updateState({theme:values.get('theme'),motion:values.get('motion'),declaredEgfr:values.get('declaredEgfr')===''?null:Number(values.get('declaredEgfr'))})){setLanguage(values.get('language'));closeDialog('settings-dialog');}else toast(t('saveFailed'));});
  document.getElementById('new-profile-form').addEventListener('submit',event=>{event.preventDefault();if(createProfile(document.getElementById('new-profile-name').value.trim()))event.currentTarget.reset();else toast(t('saveFailed'));});
  document.getElementById('export-profile').addEventListener('click',()=>downloadText(JSON.stringify(profileExport(),null,2),datedName('renal-perfil','json'),'application/json'));
  document.getElementById('import-profile').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>5e6)throw new Error('size');imported=JSON.parse(await file.text());const profile=validateProfileExport(imported);document.getElementById('profile-import-preview').textContent=t('profilePreview',{name:profile.name,count:profile.records.length});openDialog('profile-import-dialog');}catch{toast(t('importInvalid'));}event.target.value='';});
  document.getElementById('confirm-profile-import').addEventListener('click',()=>{if(imported&&importProfile(imported)){closeDialog('profile-import-dialog');toast(t('profileImported'));imported=null;}else toast(t('saveFailed'));});
  document.getElementById('delete-profile').addEventListener('click',async()=>{if(!await confirmAction(t('deleteProfile'),t('deleteProfileHint')))return;const state=getState(),profiles=state.profiles.filter(p=>p.id!==state.activeProfile);if(!profiles.length){if(!createProfile(language()==='es'?'Yo':'Me')){toast(t('saveFailed'));return;}const refreshed=getState();if(!updateState({profiles:refreshed.profiles.filter(p=>p.id!==state.activeProfile)}))toast(t('saveFailed'));}else if(!updateState({profiles,activeProfile:profiles[0].id}))toast(t('saveFailed'));});
  document.getElementById('open-privacy').addEventListener('click',()=>openDialog('privacy-dialog'));
  document.getElementById('privacy-settings').addEventListener('click',()=>{closeDialog('privacy-dialog');document.getElementById('open-settings').click();});
  const finish=()=>{if(updateState({onboarding:true}))document.getElementById('welcome').hidden=true;else {document.getElementById('welcome').hidden=true;toast(t('saveFailed'));}};
  document.getElementById('welcome-skip').addEventListener('click',finish);
  document.getElementById('welcome-next').addEventListener('click',()=>{if(step===2)finish();else{step++;renderWelcome();}});
  document.getElementById('welcome-content').addEventListener('click',event=>{const lang=event.target.closest('[data-welcome-lang]'),mode=event.target.closest('[data-welcome-mode]');if(lang)setLanguage(lang.dataset.welcomeLang);if(mode&&!updateState({dataMode:mode.dataset.welcomeMode}))toast(t('saveFailed'));renderWelcome();});
  document.getElementById('welcome').hidden=getState().onboarding||!!getRecovery();renderWelcome();
  const recovery=getRecovery();if(recovery){document.getElementById('recovery-banner').hidden=false;const backup=()=>{downloadText(recovery.raw,datedName('renal-estado-original','json'),'application/json');backupDownloaded=true;document.getElementById('restart-state').disabled=false;};document.getElementById('backup-original').addEventListener('click',backup);document.getElementById('restart-state').addEventListener('click',async()=>{if(backupDownloaded&&await confirmAction(t('restart'),t('recoveryHint'))){if(restartAfterBackup())location.reload();else toast(t('saveFailed'));}});backup();}
  on(EVENTOS.STATE,refresh);on(EVENTOS.LANGUAGE,()=>{translateDOM();refresh();renderWelcome();});refresh();
}
function renderWelcome(){document.getElementById('welcome-step').textContent=t('welcomeStep',{current:step+1});document.getElementById('welcome-title').textContent=t(['welcomeLanguage','welcomeMode','welcomePrivacy'][step]);document.getElementById('welcome-next').textContent=t(step===2?'start':'next');document.getElementById('welcome-content').innerHTML=step===0?`<div class="segmented"><button data-welcome-lang="es" aria-pressed="${language()==='es'}">Español</button><button data-welcome-lang="en" aria-pressed="${language()==='en'}">English</button></div>`:step===1?`<div class="welcome-choices"><button data-welcome-mode="demo" aria-pressed="${getState().dataMode==='demo'}">${e(t('welcomeDemo'))}</button><button data-welcome-mode="personal" aria-pressed="${getState().dataMode==='personal'}">${e(t('welcomePersonal'))}</button></div>`:`<p>${e(t('profilePrivacy'))}</p>`;}
````

## manifest.webmanifest

````json
{
  "name": "Renal · Proyecto COIL",
  "short_name": "Renal",
  "lang": "es",
  "start_url": "./index.html#descubrir",
  "display": "standalone",
  "background_color": "#f5f7f9",
  "theme_color": "#146d88",
  "icons": [
    {
      "src": "assets/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ]
}
````

## package.json

````json
{
  "name": "renal-coil",
  "version": "3.3.0",
  "private": true,
  "description": "Web educativa estática sobre salud renal. Sin dependencias.",
  "scripts": {
    "dev": "node tools/servidor_node.cjs",
    "portable": "node tools/portable.cjs",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint js tests tools/*.cjs eslint.config.js",
    "check:i18n": "node tools/check_i18n.cjs",
    "verify": "node tools/verify.cjs"
  },
  "devDependencies": {
    "eslint": "^10.12.0",
    "vitest": "^5.0.3"
  },
  "type": "module"
}
````

## servidor.py

````python
"""Servidor local del proyecto. No envía datos ni instala dependencias."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial
import webbrowser

root=Path(__file__).resolve().parent
url='http://localhost:8000/index.html'
print('Renal COIL disponible en '+url+'\nCtrl + C para detener.')
try:
    server=ThreadingHTTPServer(('127.0.0.1',8000),partial(SimpleHTTPRequestHandler,directory=str(root)))
except OSError:
    raise SystemExit('El puerto 8000 está ocupado. Usa Live Server o el comando indicado en LEEME.md.')
webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
````

## sw.js

````javascript
// Caché limitada a la interfaz. JSON de contenido y archivo autónomo quedan fuera.
const CACHE='coil-ui-v3-3-diseno-20261010';
const FILES=[
  "./",
  "./index.html",
  "js/animations.js",
  "js/app.js",
  "js/charts.js",
  "js/clinical.js",
  "js/csv.js",
  "js/data.js",
  "js/education.js",
  "js/events.js",
  "js/files.js",
  "js/habit-tools.js",
  "js/home-tracking.js",
  "js/habits.js",
  "js/i18n.js",
  "js/install.js",
  "js/kidney-explorer.js",
  "js/kidney-tools.js",
  "js/measurements.js",
  "js/preferences.js",
  "js/presentation.js",
  "js/print.js",
  "js/recipe-tools.js",
  "js/recipes.js",
  "js/router.js",
  "js/search.js",
  "js/selectors.js",
  "js/store.js",
  "js/symptoms.js",
  "js/tracking-tools.js",
  "js/ui.js",
  "js/workspace.js",
  "css/base.css",
  "css/components.css",
  "css/extensions.css",
  "css/layout.css",
  "css/tokens.css",
  "css/visual.css",
  "assets/fonts/editorial-italic.woff2",
  "assets/fonts/editorial.woff2",
  "assets/fonts/texto-bold.woff2",
  "assets/fonts/texto.woff2"
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('coil-ui-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url),base=new URL('./',self.location.href),path=url.pathname.slice(base.pathname.length);if(event.request.method!=='GET'||url.origin!==base.origin||!url.pathname.startsWith(base.pathname)||!(/^(index\.html)?$/.test(path)||/^css\/.*\.css$/.test(path)||/^js\/.*\.js$/.test(path)||/^assets\/fonts\/.*\.woff2$/.test(path)))return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}return response;}).catch(()=>caches.match(event.request)));});
````

## tests/csv.test.js

````javascript
import { describe,it,expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { measurementCSV,readMeasurementCSV,parseCSV,duplicateCount,mergeImportedRecords } from '../js/csv.js';
const metrics=JSON.parse(readFileSync('data/rangos.json','utf8')).metrics,es=JSON.parse(readFileSync('data/contenido.es.json','utf8')),en=JSON.parse(readFileSync('data/contenido.en.json','utf8'));
const record={id:'one',date:'2026-09-01',glucose:123.45,hba1c:null,systolic:120,diastolic:75,creatinine:1.02,egfr:82,uacr:0,weight:null,notes:'Dijo "revisar"; después\nsegunda línea',tags:['visit']};
const options={metrics,esLabels:es,enLabels:en,today:'2026-10-07'};
describe('CSV de intercambio',()=>{
 it('conserva BOM, punto decimal EN, notas con comillas/salto y cero',()=>{const csv=measurementCSV([record],{language:'en',metrics,labels:en,mode:'personal'});expect(csv.charCodeAt(0)).toBe(0xFEFF);expect(csv).toContain('"123.45"');expect(csv).toContain('"personal-local"');expect(csv).toContain('"Dijo ""revisar"";');const parsed=readMeasurementCSV(csv,options);expect(parsed.rejected).toEqual([]);expect(parsed.accepted[0]).toMatchObject({...record,id:expect.any(String)});});
 it('usa punto y coma y coma decimal en ES',()=>{const csv=measurementCSV([record],{language:'es',metrics,labels:es,mode:'personal'});expect(csv).toContain('"123,45";');expect(readMeasurementCSV(csv,options).accepted[0].creatinine).toBe(1.02);});
 it('excluye la procedencia de ejemplo ficticio del perfil personal',()=>{const csv=measurementCSV([record],{language:'es',metrics,labels:es,mode:'demo'});expect(csv).toContain('"fictional-demo"');expect(readMeasurementCSV(csv,options).accepted).toEqual([]);expect(readMeasurementCSV(csv,options).rejected).toHaveLength(1);});
 it('rechaza unidades cambiadas, fechas imposibles y números mal escritos',()=>{const csv=measurementCSV([record],{language:'en',metrics,labels:en,mode:'personal'});expect(()=>readMeasurementCSV(csv.replace('mg/dL','mmol/L'),options)).toThrow();expect(readMeasurementCSV(csv.replace('2026-09-01','2026-02-30'),options).rejected).toHaveLength(1);expect(readMeasurementCSV(csv.replace('123.45','12x'),options).rejected).toHaveLength(1);});
 it('rechaza comillas sin cierre y conserva separadores dentro de una celda',()=>{expect(parseCSV('"a;b";"c"',';')).toEqual([['a;b','c']]);expect(()=>parseCSV('"unfinished',';')).toThrow();});
 it('sobrescribe solo métricas coincidentes y conserva las otras',()=>{const incoming={...record,id:'two',glucose:110,hba1c:null,systolic:null,diastolic:null,creatinine:null,egfr:null,uacr:null,weight:null};expect(duplicateCount([record],[incoming])).toBe(1);const merged=mergeImportedRecords([record],[incoming],'overwrite');expect(merged).toHaveLength(2);expect(merged[0].glucose).toBeNull();expect(merged[0].systolic).toBe(120);expect(merged[1].glucose).toBe(110);expect(record.glucose).toBe(123.45);});
 it('neutraliza fórmulas en notas y recupera el texto al importar',()=>{const csv=measurementCSV([{...record,notes:'=SUM(A1)'}],{language:'es',metrics,labels:es,mode:'personal'});expect(csv).toContain("'=SUM(A1)");expect(readMeasurementCSV(csv,options).accepted[0].notes).toBe('=SUM(A1)');});
});
````

## tests/i18n.test.js

````javascript
import { it,expect } from 'vitest';
import { readFileSync } from 'node:fs';
const read=file=>JSON.parse(readFileSync('data/'+file,'utf8'));
function keys(value,prefix=''){return Object.entries(value).flatMap(([key,item])=>{const name=prefix?prefix+'.'+key:key;return item&&typeof item==='object'?keys(item,name):[name];}).sort();}
it('ES y EN tienen las mismas claves, también en objetos y listas',()=>{expect(keys(read('contenido.es.json'))).toEqual(keys(read('contenido.en.json')));});
it('todas las fuentes referenciadas existen y una aprobación exige firma',()=>{const sources=read('fuentes.json'),ids=sources.map(s=>s.id),ranges=read('rangos.json');for(const lang of ['es','en'])for(const section of read('contenido.'+lang+'.json').sections)for(const id of section.sources)expect(ids).toContain(id);if(ranges.clinicalValidation.approved){expect(ranges.clinicalValidation.reviewer).toBeTruthy();expect(ranges.clinicalValidation.reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);for(const config of Object.values(ranges.metrics))if(config.exampleBand)expect(ids).toContain(config.sourceId);}});
it('una receta aprobada exige revisor, fecha y análisis por porción',()=>{for(const recipe of read('recetas.json'))if(recipe.status==='validated'){expect(recipe.validatedBy).toBeTruthy();expect(recipe.validatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);for(const value of Object.values(recipe.nutrientAnalysis))expect(typeof value).toBe('number');}});

it('las cifras identifican fuente, año, población y metodología sin inventar faltantes',()=>{const ids=read('fuentes.json').map(s=>s.id);for(const lang of ['es','en'])for(const statistic of read('contenido.'+lang+'.json').statistics){for(const key of ['source','url','year','population','methodology'])expect(statistic).toHaveProperty(key);if(statistic.sourceId)expect(ids).toContain(statistic.sourceId);if(statistic.verified){expect(statistic.source).toBeTruthy();expect(statistic.url).toMatch(/^https:\/\//);expect(statistic.year).toBeGreaterThan(1900);expect(statistic.population).toBeTruthy();}}});
````

## tests/selectors.test.js

````javascript
import { it,expect } from 'vitest';
import { getVisibleRecords,getChartSeries,getHabitScore } from '../js/selectors.js';
it('filtra de forma inmutable, conserva cero y reutiliza el resultado',()=>{const state={records:[{id:'b',date:'2026-10-02',uacr:0,tags:['visit']},{id:'a',date:'2026-09-02',uacr:3,tags:[]}]},filters={from:'2026-10-01',tag:'visit'};const result=getVisibleRecords(state,filters);expect(result).toHaveLength(1);expect(Object.isFrozen(result[0])).toBe(true);expect(getVisibleRecords(state,filters)).toBe(result);expect(getChartSeries(state,'uacr',filters)[0].value).toBe(0);});
it('calcula rachas por hábito sin premiar fechas futuras',()=>{const state={habits:{'2026-10-05':{a:true},'2026-10-06':{a:true},'2026-10-07':{a:true}}};const score=getHabitScore(state,[{id:'a',target:7}],['2026-10-05','2026-10-06'],'2026-10-06');expect(score.perHabit.a).toBe(2);expect(score.done).toBe(2);});
````

## tests/store.test.js

````javascript
import { beforeEach,describe,it,expect,vi } from 'vitest';
import { initializeStore,migrate,getState,updateState,STORAGE_KEY,getRecovery,canStore,createProfile,switchProfile,validateProfileExport,profileExport } from '../js/store.js';
const record={id:'one',date:'2026-09-01',glucose:120};
const v2={version:2,language:'en',records:[record],favorites:['avena'],habits:{'2026-09-01':{activity:true}},dataMode:'personal'};
function storage(){const map=new Map();return {getItem:key=>map.get(key)||null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)};}
beforeEach(()=>{vi.stubGlobal('localStorage',storage());initializeStore();});
describe('Estado y migración conservadora',()=>{
 it('migra v2 a v3 sin perder registros, notas ni hábitos',()=>{const migrated=migrate(2,v2);expect(migrated.version).toBe(3);expect(migrated.profiles[0].records[0]).toMatchObject({...record,notes:'',tags:[]});expect(migrated.profiles[0].habits).toEqual(v2.habits);});
 it('guarda copia cruda antes de migrar y registra solo el cambio de versión',()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(v2));const log=vi.spyOn(console,'info').mockImplementation(()=>{});initializeStore();expect(localStorage.getItem(STORAGE_KEY+'-before-v3')).toBe(JSON.stringify(v2));expect(log).toHaveBeenCalledOnce();initializeStore();expect(log).toHaveBeenCalledOnce();log.mockRestore();});
 it('persiste un registro válido y devuelve copias independientes',()=>{expect(updateState({records:[record]})).toBe(true);const copy=getState();copy.records[0].glucose=999;expect(getState().records[0].glucose).toBe(120);initializeStore();expect(getState().records[0].glucose).toBe(120);});
 it('conserva el original y bloquea escrituras si una migración falla',()=>{const raw=JSON.stringify({...v2,records:[{...record,date:'2026-02-30'}]});localStorage.setItem(STORAGE_KEY,raw);initializeStore();expect(getRecovery().raw).toBe(raw);expect(updateState({language:'es'})).toBe(false);expect(localStorage.getItem(STORAGE_KEY)).toBe(raw);});
 it('tolera localStorage denegado sin aparentar un guardado exitoso',()=>{vi.stubGlobal('localStorage',{getItem:()=>{throw new Error('denied');},setItem:()=>{throw new Error('denied');}});expect(()=>initializeStore()).not.toThrow();expect(canStore()).toBe(false);expect(updateState({records:[record]})).toBe(false);expect(getState().records).toEqual([]);});
 it('mantiene historiales independientes y valida JSON antes de aceptarlo',()=>{updateState({records:[record]});const main=getState().activeProfile,id=createProfile('Pruebas');expect(getState().records).toEqual([]);switchProfile(main);expect(getState().records).toHaveLength(1);switchProfile(id);expect(validateProfileExport(profileExport()).name).toBe('Pruebas');expect(()=>validateProfileExport({kind:'renal-coil-profile',schemaVersion:2,profile:{}})).toThrow();});
});
````

## tools/check_i18n.cjs

````javascript
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function keys(value,prefix=''){return Object.entries(value).flatMap(([key,item])=>{const name=prefix?prefix+'.'+key:key;return item&&typeof item==='object'?keys(item,name):[name];}).sort();}
const es=keys(JSON.parse(fs.readFileSync(path.join(root,'data/contenido.es.json'),'utf8'))),en=keys(JSON.parse(fs.readFileSync(path.join(root,'data/contenido.en.json'),'utf8'))),differences=[...es.filter(k=>!en.includes(k)),...en.filter(k=>!es.includes(k))];if(differences.length){console.error('Claves huérfanas:',differences);process.exit(1);}console.log(`ES/EN: ${es.length} claves equivalentes.`);
````

## tools/crear_portable.py

````python
"""Genera una copia autónoma a partir del código modular, sin paquetes externos.

El empaquetador cubre las importaciones nombradas utilizadas en este proyecto.
Para incorporar una biblioteca o un export default, actualizar este script.
"""
import base64
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
modules, order, visiting = {}, [], set()
import_re = re.compile(r"import\s*\{([^}]+)\}\s*from\s*['\"]([^'\"]+)['\"];?")
dynamic_re = re.compile(r"import\(['\"]([^'\"]+)['\"]\)")
export_re = re.compile(r'export\s+(?:async\s+)?(?:function|const|let|class)\s+(\w+)')

def collect(path):
    path = path.resolve()
    if path in modules or path in visiting:
        return
    visiting.add(path)
    source = path.read_text(encoding='utf-8')
    for match in import_re.finditer(source):
        collect(path.parent / match.group(2))
    for match in dynamic_re.finditer(source):
        collect(path.parent / match.group(1))
    module_key = str(path.relative_to(ROOT)).replace('\\','/')
    def replace_import(match):
        dependency = (path.parent / match.group(2)).resolve()
        key = str(dependency.relative_to(ROOT)).replace('\\','/')
        names = re.sub(r'\s+as\s+', ':', match.group(1))
        return f'const {{{names}}} = getModule({json.dumps(key)});'
    def replace_dynamic(match):
        key = str((path.parent / match.group(1)).resolve().relative_to(ROOT)).replace('\\','/')
        return f'Promise.resolve().then(()=>getModule({json.dumps(key)}))'
    exported = export_re.findall(source)
    source = import_re.sub(replace_import, source)
    source = dynamic_re.sub(replace_dynamic, source)
    source = re.sub(r'\bexport\s+(?=(?:async\s+)?(?:function|const|let|class)\b)', '', source)
    modules[path] = f'factories[{json.dumps(module_key)}] = ()=>{{\n{source}\nreturn {{{", ".join(exported)}}};\n}};'
    order.append(path)
    visiting.remove(path)

collect(ROOT/'js/app.js')
bundle = "(()=>{'use strict';const factories={},modules={};function getModule(key){return modules[key]||(modules[key]=factories[key]());}\n" + '\n'.join(modules[p] for p in order) + "\ngetModule('js/app.js');})();"
assets = {}
for key, filename in [('es','contenido.es.json'),('en','contenido.en.json'),('recipes','recetas.json'),('ranges','rangos.json'),('sources','fuentes.json'),('presentation','presentacion.json')]:
    assets[key] = json.loads((ROOT/'data'/filename).read_text(encoding='utf-8'))
assets['kidney'] = (ROOT/'assets/kidney.svg').read_text(encoding='utf-8')
styles=[]
for path in ['tokens.css','base.css','layout.css','components.css','extensions.css','visual.css']:
    source=(ROOT/'css'/path).read_text(encoding='utf-8')
    def embed_font(match):
        font=(ROOT/'css'/match.group(1)).resolve()
        return 'url("data:font/woff2;base64,'+base64.b64encode(font.read_bytes()).decode()+'")'
    source=re.sub(r"url\(['\"]([^'\"]+\.(?:otf|woff2))['\"]\)",embed_font,source)
    styles.append(source)
html=(ROOT/'index.html').read_text(encoding='utf-8')
html=re.sub(r'  <link rel="stylesheet"[^>]+>\n','',html)
html=html.replace('</head>','<style>\n'+'\n'.join(styles)+'\n</style>\n</head>')
favicon=(ROOT/'assets/favicon.svg').read_text(encoding='utf-8')
html=html.replace('href="assets/favicon.svg"','href="data:image/svg+xml;base64,'+base64.b64encode(favicon.encode()).decode()+'"')
html=re.sub(r'  <link rel="preload"[^>]+>\n','',html)
html=re.sub(r'  <link rel="manifest"[^>]+>\n','',html)
html=re.sub(r'  <meta (?:property="og:image[^"\n]*"|name="twitter:image")[^>]+>\n','',html)
html=re.sub(r'  <script>if \(location.protocol[\s\S]*?</script>\n','',html)
embedded_data=json.dumps(assets,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
script='window.__COIL_DATA='+embedded_data+';\n'+bundle
html=html.replace('<script type="module" src="js/app.js"></script>','<script>\n'+script.replace('</script','<\\/script')+'\n</script>')
(ROOT/'Abrir_sin_instalar.html').write_text(html,encoding='utf-8')
print('Creado: Abrir_sin_instalar.html ('+str(len(html.encode()))+' bytes)')
````

## tools/portable.cjs

````javascript
// Busca Python sin exigir que Windows tenga un alias llamado python3.
const {spawnSync}=require('node:child_process');
const path=require('node:path');
const candidates=process.platform==='win32'?['py','python','python3']:['python3','python'];
const python=candidates.find(command=>spawnSync(command,['--version'],{stdio:'ignore'}).status===0);
if(!python){console.error('Instala Python 3 para regenerar el HTML, o abre la copia autónoma incluida.');process.exit(1);}
const result=spawnSync(python,['tools/crear_portable.py'],{cwd:path.resolve(__dirname,'..'),stdio:'inherit'});
process.exit(result.status===null?1:result.status);
````

## tools/servidor_node.cjs

````javascript
// Alternativa a Python. Servidor estático con las bibliotecas incluidas en Node.
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const zlib=require('node:zlib');
const root=path.resolve(__dirname,'..');
const args=process.argv.slice(2);
const option=(key,fallback)=>{const index=args.indexOf(key);return index>=0?args[index+1]:fallback;};
const host=option('--host','127.0.0.1'),port=Number(option('--port','8000'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.otf':'font/otf','.woff2':'font/woff2','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer((request,response)=>{
  let route;
  try{route=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch{response.writeHead(400);response.end();return;}
  const file=path.resolve(root,'.'+(route==='/'?'/index.html':route));
  if(!file.startsWith(root+path.sep)){response.writeHead(403);response.end();return;}
  fs.stat(file,(error,stat)=>{
    if(error||!stat.isFile()){response.writeHead(404);response.end('Not found');return;}
    const compress=/\.(html|css|js|json|svg|webmanifest)$/.test(file)&&/gzip/.test(request.headers['accept-encoding']||'');
    response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','Vary':'Accept-Encoding',...(compress?{'Content-Encoding':'gzip'}:{})});
    const stream=fs.createReadStream(file);stream.on('error',()=>response.destroy());if(compress)stream.pipe(zlib.createGzip()).pipe(response);else stream.pipe(response);
  });
}).listen(port,host,()=>console.log(`Renal COIL: http://${host}:${port}`));
````

## tools/verificar_responsive.html

````html
<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Renal · Revisión adaptable</title><style>body{margin:0;padding:18px;background:#e5e8e0;color:#173e36;font:16px/1.5 system-ui}header{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:18px}button,select{padding:8px 12px;font:inherit;color:inherit;background:#faf8f1;border:1px solid #98a797;border-radius:4px}button[aria-pressed=true]{background:#173e36;color:white}#holder{margin:auto;position:relative;background:#faf8f1;box-shadow:0 0 0 1px #98a797}iframe{border:0;transform-origin:top left;display:block}output{font-size:14px;margin-left:auto}h1{font-size:20px;margin:0 14px 0 0}</style><header><h1>Renal / revisión</h1><button data-width="360" aria-pressed="true">360 px</button><button data-width="768" aria-pressed="false">768 px</button><button data-width="1280" aria-pressed="false">1280 px</button><button data-width="1920" aria-pressed="false">1920 px</button><label>Sección <select id="route"><option value="descubrir">Descubrir</option><option value="seguimiento">Seguimiento</option><option value="alimentacion">Alimentación</option><option value="habitos">Hábitos</option><option value="senales">Señales</option><option value="proyecto">Proyecto</option></select></label><label><input id="text-scale" type="checkbox"> Texto 200%</label><button id="measure">Medir</button><output id="result"></output></header><div id="holder"><iframe id="preview-frame" title="Vista adaptable de Renal" src="../index.html#descubrir" width="360" height="900"></iframe></div><script>
let width=360;const frame=document.getElementById('preview-frame'),holder=document.getElementById('holder');
function layout(){const scale=Math.min(1,(window.innerWidth-36)/width);frame.style.width=width+'px';frame.style.height='900px';frame.style.transform='scale('+scale+')';holder.style.width=width*scale+'px';holder.style.height=900*scale+'px';}
document.querySelectorAll('[data-width]').forEach(button=>button.addEventListener('click',()=>{width=Number(button.dataset.width);document.querySelectorAll('[data-width]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));layout();document.getElementById('result').textContent='';}));
function applyTextScale(){if(frame.contentDocument?.documentElement)frame.contentDocument.documentElement.style.fontSize=document.getElementById('text-scale').checked?'200%':'';}
frame.addEventListener('load',applyTextScale);document.getElementById('text-scale').addEventListener('change',applyTextScale);
document.getElementById('route').addEventListener('change',event=>{frame.src='../index.html#'+event.target.value;document.getElementById('result').textContent='';});
document.getElementById('measure').addEventListener('click',async event=>{const button=event.currentTarget;button.setAttribute('aria-busy','true');const doc=frame.contentDocument;const animations=doc.getAnimations().filter(a=>a.playState==='running'&&a.effect?.getComputedTiming().iterations!==Infinity);await Promise.allSettled(animations.map(a=>a.finished));await new Promise(resolve=>frame.contentWindow.requestAnimationFrame(()=>frame.contentWindow.requestAnimationFrame(resolve)));document.getElementById('result').textContent=doc.documentElement.clientWidth+' px / contenido: '+doc.documentElement.scrollWidth+' px';button.setAttribute('aria-busy','false');});window.addEventListener('resize',layout);layout();
</script></html>
````

## tools/verify.cjs

````javascript
const {spawnSync}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),npm=process.platform==='win32'?'npm.cmd':'npm';
for(const task of ['lint','check:i18n','test']){const result=spawnSync(npm,['run',task],{cwd:root,stdio:'inherit',shell:process.platform==='win32'});if(result.status!==0)process.exit(result.status||1);}
const result=spawnSync(process.execPath,['tools/portable.cjs'],{cwd:root,stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);const size=fs.statSync(path.join(root,'Abrir_sin_instalar.html')).size;if(size<=500000||size>=3000000){console.error('Tamaño autónomo fuera de los límites:',size);process.exit(1);}console.log('Listo para presentar');console.log('La revisión técnica no sustituye la aprobación clínica del contenido.');
````
